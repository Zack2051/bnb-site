"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Users,
  Phone,
  User,
  Send,
  BedDouble,
  ParkingSquare,
  Coffee,
  StickyNote,
} from "lucide-react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbzNlwXbTfTLvrC_o9CTk7JRCG4SbnkExsFEVG_BwbBYu6EQfVAvFpWLfngdRC3L-mioKw/exec";
const TOKEN = "CHANGE_ME_TO_A_RANDOM_STRING_10";

type FormState = {
  roomType: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  breakfast: boolean;
  parkingNeed: boolean;
  contactName: string;
  contactPhone: string;
  specialRequest: string;
};

function calcNights(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const [y1, m1, d1] = checkIn.split("-").map(Number);
  const [y2, m2, d2] = checkOut.split("-").map(Number);
  if (!y1 || !m1 || !d1 || !y2 || !m2 || !d2) return 0;
  const t1 = Date.UTC(y1, m1 - 1, d1);
  const t2 = Date.UTC(y2, m2 - 1, d2);
  return Math.max(0, Math.floor((t2 - t1) / (1000 * 60 * 60 * 24)));
}

async function createBooking(item: Record<string, any>) {
  const payload = new URLSearchParams({
    token: TOKEN,
    action: "create",
    item: JSON.stringify(item),
  });

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: payload,
  });

  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { ok: false, error: "Invalid JSON response", raw: text };
  }
}

export default function BookingPage() {
  const router = useRouter();

  const today = useMemo(() => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const [s, setS] = useState<FormState>({
    roomType: "double",
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    breakfast: false,
    parkingNeed: false,
    contactName: "",
    contactPhone: "",
    specialRequest: "",
  });

  const nights = useMemo(
    () => calcNights(s.checkIn, s.checkOut),
    [s.checkIn, s.checkOut]
  );

  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);

  function update(patch: Partial<FormState>) {
    // ✅ 只要使用者改任何欄位，就視為「新的一筆」，把成功狀態拿掉
    setSuccess(false);
    setErr("");
    setS((prev) => ({ ...prev, ...patch }));
  }

  function validate() {
    if (!s.checkIn) return "請選擇入住日期";
    if (!s.checkOut) return "請選擇退房日期";
    if (s.checkOut <= s.checkIn) return "退房日期需晚於入住日期";
    if (!s.contactName.trim()) return "請填聯絡人姓名";
    if (!s.contactPhone.trim()) return "請填聯絡電話";
    if (s.adults <= 0) return "成人數需至少 1";
    if (nights <= 0) return "晚數計算異常";
    return null;
  }

  async function submit() {
    setErr("");
    const v = validate();
    if (v) return setErr(v);

    setSubmitting(true);
    try {
      const item = {
        status: "pending",
        roomType: s.roomType,
        checkIn: s.checkIn,
        nights,
        checkOut: s.checkOut,
        adults: Number(s.adults),
        children: Number(s.children),
        breakfast: Boolean(s.breakfast),
        parkingNeed: Boolean(s.parkingNeed),
        contactName: s.contactName.trim(),
        contactPhone: s.contactPhone.trim(),
        specialRequest: s.specialRequest.trim(),
      };

      const resp = await createBooking(item);

      if (!resp?.ok) {
        setErr(resp?.error ? String(resp.error) : "送出失敗");
        return;
      }

      // ✅ 成功：顯示成功訊息（不跳頁，讓使用者看得到）
      setSuccess(true);
      setErr("");
    } catch (e: any) {
      setErr(String(e?.message || e));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 transition"
          >
            <ArrowLeft size={16} />
            返回
          </Link>
          <div className="text-sm font-semibold text-neutral-900">訂房資料</div>
          <div className="w-[64px]" />
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-6">
        <div className="grid gap-5 lg:grid-cols-[1fr,360px]">
          {/* 表單 */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            {success && (
              <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                ✅ 預訂成功！我們會盡快與你聯絡確認。
              </div>
            )}

            <div className="text-xl font-semibold text-neutral-900">填寫訂房</div>

            <div className="mt-6 grid gap-5">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-900">
                  <BedDouble size={16} className="text-neutral-600" /> 房型
                </div>
                <select
                  className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-400"
                  value={s.roomType}
                  onChange={(e) => update({ roomType: e.target.value })}
                >
                  <option value="double">二人房</option>
                  <option value="quad">四人房</option>
                  <option value="six">六人房</option>
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-900">
                    <Calendar size={16} className="text-neutral-600" /> 入住日期
                  </div>
                  <input
                    type="date"
                    min={today}
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-400"
                    value={s.checkIn}
                    onChange={(e) => update({ checkIn: e.target.value })}
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-900">
                    <Calendar size={16} className="text-neutral-600" /> 退房日期
                  </div>
                  <input
                    type="date"
                    min={s.checkIn || today}
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-400"
                    value={s.checkOut}
                    onChange={(e) => update({ checkOut: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-900">
                    <Users size={16} className="text-neutral-600" /> 成人
                  </div>
                  <input
                    type="number"
                    min={1}
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-400"
                    value={s.adults}
                    onChange={(e) => update({ adults: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-900">
                    <Users size={16} className="text-neutral-600" /> 小孩
                  </div>
                  <input
                    type="number"
                    min={0}
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-400"
                    value={s.children}
                    onChange={(e) => update({ children: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm">
                  <input
                    type="checkbox"
                    checked={s.breakfast}
                    onChange={(e) => update({ breakfast: e.target.checked })}
                  />
                  <Coffee size={16} className="text-neutral-600" />
                  需要早餐
                </label>

                <label className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm">
                  <input
                    type="checkbox"
                    checked={s.parkingNeed}
                    onChange={(e) => update({ parkingNeed: e.target.checked })}
                  />
                  <ParkingSquare size={16} className="text-neutral-600" />
                  需要停車
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-900">
                    <User size={16} className="text-neutral-600" /> 聯絡人姓名
                  </div>
                  <input
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-400"
                    value={s.contactName}
                    onChange={(e) => update({ contactName: e.target.value })}
                    placeholder="例如：王先生"
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-900">
                    <Phone size={16} className="text-neutral-600" /> 聯絡電話
                  </div>
                  <input
                    className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-400"
                    value={s.contactPhone}
                    onChange={(e) => update({ contactPhone: e.target.value })}
                    placeholder="例如：0912345678"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-neutral-900">
                  <StickyNote size={16} className="text-neutral-600" /> 特殊需求（可選）
                </div>
                <textarea
                  className="min-h-[110px] w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-400"
                  value={s.specialRequest}
                  onChange={(e) => update({ specialRequest: e.target.value })}
                  placeholder="例如：預計抵達時間、加枕頭......"
                />
              </div>

              {err ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {err}
                </div>
              ) : null}

              <button
                onClick={submit}
                disabled={submitting || success}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-60 transition"
              >
                <Send size={16} />
                {success ? "已送出" : submitting ? "送出中..." : "送出訂房"}
              </button>
            </div>
          </div>

          {/* 右側摘要 */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-neutral-900">訂房摘要</div>
            <div className="mt-3 grid gap-2 text-sm text-neutral-700">
              <div className="flex justify-between">
                <span>房型</span>
                <span className="font-semibold">{s.roomType}</span>
              </div>
              <div className="flex justify-between">
                <span>入住</span>
                <span className="font-semibold">{s.checkIn || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span>退房</span>
                <span className="font-semibold">{s.checkOut || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span>晚數</span>
                <span className="font-semibold">{nights || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>成人 / 小孩</span>
                <span className="font-semibold">
                  {s.adults} / {s.children}
                </span>
              </div>
              <div className="flex justify-between">
                <span>早餐</span>
                <span className="font-semibold">{s.breakfast ? "需要" : "不需要"}</span>
              </div>
              <div className="flex justify-between">
                <span>停車</span>
                <span className="font-semibold">
                  {s.parkingNeed ? "需要" : "不需要"}
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-neutral-50 p-4 text-xs text-neutral-600 leading-5">
              送出後狀態會是 <b>待確認</b>，我們會再用電話 / LINE 與你確認房況與訂房結果。
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
