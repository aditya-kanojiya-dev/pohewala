import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";
import { listLeads } from "@/lib/leads";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const typeLabel: Record<string, string> = {
  contact: "Contact",
  franchise: "Franchise",
  enquiry: "Enquiry",
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const cookieStore = await cookies();
  const authed = verifySession(cookieStore.get(SESSION_COOKIE)?.value);

  if (!authed) {
    return (
      <section className="max-w-md mx-auto px-4 py-16 sm:py-24">
        <div className="bg-black rounded-3xl border-[3px] border-[#FCEE57] p-8 shadow-2xl">
          <h1 className="font-serif font-black text-2xl text-white text-center">
            Admin Login
          </h1>
          <p className="text-sm text-[#BCBCBC] text-center mt-2">
            Pohewala lead management
          </p>

          {error && (
            <p className="mt-5 text-sm text-red-400 bg-red-950/50 border border-red-500/40 rounded-lg px-4 py-2.5 text-center">
              Invalid password. Try again.
            </p>
          )}

          <form action="/api/admin/login" method="post" className="mt-6 space-y-4">
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-white mb-1.5">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                className="w-full bg-white border border-[#BCBCBC] rounded-lg px-4 py-2.5 text-base text-black placeholder-[#BCBCBC] focus:outline-none focus:border-[#FCEE57] focus:ring-2 focus:ring-[#FCEE57]/50"
                placeholder="Enter admin password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#FCEE57] hover:bg-black hover:text-[#FCEE57] text-black font-bold py-3 rounded-lg transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </section>
    );
  }

  const leads = await listLeads();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-[#FCEE57]">
            Enquiries
          </h1>
          <p className="text-sm text-white mt-1">
            {leads.length} submission{leads.length === 1 ? "" : "s"} received
          </p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button
            type="submit"
            className="bg-white hover:bg-black hover:text-white text-black text-sm font-bold px-5 py-2.5 rounded-lg border transition cursor-pointer"
          >
            Log Out
          </button>
        </form>
      </div>

      {leads.length === 0 ? (
        <div className="bg-black rounded-3xl border-[3px] border-[#FCEE57]/40 p-12 text-center">
          <p className="text-white font-medium">
            No enquiries yet. They will appear here once someone submits a form.
          </p>
        </div>
      ) : (
        <div className="bg-black rounded-3xl border-[3px] border-[#FCEE57]/40 overflow-x-auto shadow-2xl">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#666666] text-white">
                <th className="px-5 py-4 font-bold">Type</th>
                <th className="px-5 py-4 font-bold">Name</th>
                <th className="px-5 py-4 font-bold">Contact</th>
                <th className="px-5 py-4 font-bold">City / Subject</th>
                <th className="px-5 py-4 font-bold">Message</th>
                <th className="px-5 py-4 font-bold">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-[#666666]/40 align-top">
                  <td className="px-5 py-4">
                    <span className="bg-[#FCEE57] text-black text-xs font-bold px-2.5 py-1 rounded-full">
                      {typeLabel[lead.type] ?? lead.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-white font-medium">{lead.name}</td>
                  <td className="px-5 py-4 text-[#BCBCBC]">
                    <a href={`mailto:${lead.email}`} className="hover:text-[#FCEE57] underline break-all">
                      {lead.email}
                    </a>
                    <br />
                    <a href={`tel:${lead.phone}`} className="hover:text-[#FCEE57] underline whitespace-nowrap">
                      {lead.phone}
                    </a>
                    {lead.extra && <div className="text-white mt-1">{lead.extra}</div>}
                  </td>
                  <td className="px-5 py-4 text-white">
                    {lead.city && <div>{lead.city}</div>}
                    {lead.subject && <div className="text-[#BCBCBC]">{lead.subject}</div>}
                  </td>
                  <td className="px-5 py-4 text-[#BCBCBC] max-w-[280px]">{lead.message}</td>
                  <td className="px-5 py-4 text-[#BCBCBC] whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 text-xs text-[#BCBCBC]">
        Enquiries are stored in the connected database. Old submissions can be
        cleared directly in your database.
      </p>
    </section>
  );
}
