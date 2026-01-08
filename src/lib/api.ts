const rawApiBase = (import.meta.env.VITE_API_BASE as string) || 'https://mistockhq-backend.vercel.app/'
const API_BASE = rawApiBase.replace(/\/+$/, '') // trim trailing slash(es)

type ApiPayload = Record<string, unknown>

async function request(path: string, opts: RequestInit = {}){
  const res = await fetch(`${API_BASE}${path}`, { headers: { 'Content-Type': 'application/json' }, ...opts })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText })) as { message?: string }
    throw new Error(err.message || 'API error')
  }
  return res.json().catch(() => ({}))
}

export const api = {
  // Auth
  login: (email: string, password: string) => request('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  sendOtp: (email: string, resend?: boolean) => request(`/api/auth/send-otp/${encodeURIComponent(email)}?resend=${!!resend}`),
  verifyOtp: (email: string, otp: string, payload: ApiPayload) => request(`/api/auth/verify-otp/${encodeURIComponent(email)}/${encodeURIComponent(otp)}`, { method: 'POST', body: JSON.stringify(payload) }),

  // Vendors
  listVendorsPublic: (category?: string) => request(`/api/vendors/public${category ? `?category=${encodeURIComponent(category)}` : ''}`),
  createVendor: (requestorEmail: string, vendor: ApiPayload) => request(`/api/vendors/create/${encodeURIComponent(requestorEmail)}`, { method: 'POST', body: JSON.stringify(vendor) }),
  updateVendor: (vendorId: string, requestorEmail: string, updates: ApiPayload) => request(`/api/vendors/${encodeURIComponent(vendorId)}/${encodeURIComponent(requestorEmail)}`, { method: 'PATCH', body: JSON.stringify(updates) }),
  getVendorFull: (vendorId: string, requestorEmail: string) => request(`/api/vendors/full/${encodeURIComponent(vendorId)}/${encodeURIComponent(requestorEmail)}`),

  // Vendor items
  getVendorItems: (vendorId: string) => request(`/api/vendor-items/${encodeURIComponent(vendorId)}`),
  addVendorItem: (vendorId: string, requestorEmail: string, item: ApiPayload) => request(`/api/vendor-items/${encodeURIComponent(vendorId)}/${encodeURIComponent(requestorEmail)}`, { method: 'POST', body: JSON.stringify(item) }),
  updateVendorItemPrice: (vendorId: string, itemId: string, requestorEmail: string, price: number) => request(`/api/vendor-items/${encodeURIComponent(vendorId)}/${encodeURIComponent(itemId)}/${encodeURIComponent(requestorEmail)}`, { method: 'PATCH', body: JSON.stringify({ price }) }),

  // Complaints
  fileComplaint: (reporterEmail: string, body: ApiPayload) => request(`/api/complaints/file/${encodeURIComponent(reporterEmail)}`, { method: 'POST', body: JSON.stringify(body) }),

  // Workers
  addWorker: (employerEmail: string, worker: ApiPayload) => request(`/api/workers/add/${encodeURIComponent(employerEmail)}`, { method: 'POST', body: JSON.stringify(worker) }),
  getWorkers: (employerEmail: string) => request(`/api/workers/list/${encodeURIComponent(employerEmail)}`),

  // Orders
  createConnection: (userEmail: string, body: ApiPayload) => request(`/api/orders/create-connection/${encodeURIComponent(userEmail)}`, { method: 'POST', body: JSON.stringify(body) }),
  listPendingOrdersAdmin: (requestorEmail: string) => request(`/api/orders/admin/pending/${encodeURIComponent(requestorEmail)}`),
  approveOrderAdmin: (requestorEmail: string, body: ApiPayload) => request(`/api/orders/admin/approve/${encodeURIComponent(requestorEmail)}`, { method: 'POST', body: JSON.stringify(body) }),

  // Receivables/Creditors
  getReceivables: (userEmail: string) => request(`/api/user/receivables/${encodeURIComponent(userEmail)}`),
  getCreditors: (userEmail: string) => request(`/api/user/creditors/${encodeURIComponent(userEmail)}`),
  updateCreditor: (userEmail: string, supplierName: string, updates: ApiPayload) => request(`/api/user/creditors/${encodeURIComponent(userEmail)}/${encodeURIComponent(supplierName)}`, { method: 'PATCH', body: JSON.stringify(updates) })
}

export default api
