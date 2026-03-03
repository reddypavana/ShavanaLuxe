import { useEffect, useState } from "react";
import { Package, IndianRupee, TrendingUp, Truck, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface OrderItem {
  id: string;
  product_name: string;
  product_price: number;
  quantity: number;
  product_image: string | null;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  shipping_amount: number;
  payment_method: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_email: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  courier_name: string | null;
  courier_tracking_id: string | null;
  estimated_delivery: string | null;
  created_at: string;
  order_items: OrderItem[];
}

const statusOptions = ["pending", "confirmed", "paid", "processing", "shipped", "delivered", "cancelled"];
const statusLabels: Record<string, string> = {
  pending: "Pending", confirmed: "Confirmed", paid: "Paid", processing: "Processing",
  shipped: "Shipped", delivered: "Delivered", cancelled: "Cancelled", failed: "Failed",
};
const statusColors: Record<string, string> = {
  pending: "bg-secondary text-secondary-foreground",
  confirmed: "bg-primary/10 text-primary",
  paid: "bg-primary/15 text-primary",
  processing: "bg-accent/20 text-accent-foreground",
  shipped: "bg-primary/25 text-primary",
  delivered: "bg-primary text-primary-foreground",
  cancelled: "bg-destructive/10 text-destructive",
  failed: "bg-destructive/10 text-destructive",
};

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [editingOrder, setEditingOrder] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ status: "", courierName: "", courierTrackingId: "", estimatedDelivery: "" });

  const fetchOrders = async () => {
    const { data, error } = await supabase.functions.invoke("admin-orders", { method: "GET" });
    if (error) { toast.error("Failed to load orders"); setLoading(false); return; }
    setOrders(data.orders || []);
    setStats(data.stats || { totalRevenue: 0, totalOrders: 0 });
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleUpdate = async (orderId: string) => {
    const body: Record<string, any> = { orderId };
    if (editForm.status) body.status = editForm.status;
    if (editForm.courierName) body.courierName = editForm.courierName;
    if (editForm.courierTrackingId) body.courierTrackingId = editForm.courierTrackingId;
    if (editForm.estimatedDelivery) body.estimatedDelivery = editForm.estimatedDelivery;

    const { error } = await supabase.functions.invoke("admin-orders", {
      method: "PATCH",
      body,
    });

    if (error) { toast.error("Failed to update order"); return; }
    toast.success("Order updated!");
    setEditingOrder(null);
    fetchOrders();
  };

  const startEdit = (order: Order) => {
    setEditingOrder(order.id);
    setEditForm({
      status: order.status,
      courierName: order.courier_name || "",
      courierTrackingId: order.courier_tracking_id || "",
      estimatedDelivery: order.estimated_delivery || "",
    });
  };

  const filtered = orders.filter(o =>
    !search || o.order_number.toLowerCase().includes(search.toLowerCase()) ||
    o.shipping_name.toLowerCase().includes(search.toLowerCase()) ||
    o.shipping_email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse font-body text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="bg-champagne py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl font-semibold text-foreground">Admin Dashboard</h1>
          <p className="font-body text-muted-foreground mt-1">Manage orders and track performance</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-sm p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-sm"><IndianRupee size={20} className="text-primary" /></div>
              <div>
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">Revenue</p>
                <p className="font-display text-2xl font-semibold text-foreground">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-sm p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-sm"><Package size={20} className="text-primary" /></div>
              <div>
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">Total Orders</p>
                <p className="font-display text-2xl font-semibold text-foreground">{stats.totalOrders}</p>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-border rounded-sm p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-sm"><TrendingUp size={20} className="text-primary" /></div>
              <div>
                <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">Avg Order</p>
                <p className="font-display text-2xl font-semibold text-foreground">
                  ₹{stats.totalOrders > 0 ? Math.round(stats.totalRevenue / stats.totalOrders).toLocaleString() : 0}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search */}
        <div className="flex gap-2 mb-6 max-w-md">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="w-full pl-9 pr-3 py-2 border border-border rounded-sm font-body text-sm bg-transparent text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-center font-body text-muted-foreground py-12">No orders found.</p>
          ) : (
            filtered.map((order) => (
              <div key={order.id} className="bg-card border border-border rounded-sm">
                <div
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-display text-sm font-semibold text-foreground">{order.order_number}</span>
                    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-body font-medium ${statusColors[order.status] || statusColors.pending}`}>
                      {statusLabels[order.status] || order.status}
                    </span>
                    <span className="font-body text-xs text-muted-foreground">{order.payment_method === "cod" ? "COD" : "Razorpay"}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-body text-sm text-foreground">₹{Number(order.total_amount).toLocaleString()}</span>
                    <span className="font-body text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                    <ChevronDown size={16} className={`text-muted-foreground transition-transform ${expandedOrder === order.id ? "rotate-180" : ""}`} />
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div className="border-t border-border p-4 space-y-4">
                    {/* Customer info */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="font-body text-sm space-y-1">
                        <p className="text-muted-foreground text-xs uppercase tracking-wider">Customer</p>
                        <p className="text-foreground">{order.shipping_name}</p>
                        <p className="text-muted-foreground">{order.shipping_email}</p>
                        <p className="text-muted-foreground">{order.shipping_phone}</p>
                      </div>
                      <div className="font-body text-sm space-y-1">
                        <p className="text-muted-foreground text-xs uppercase tracking-wider">Shipping Address</p>
                        <p className="text-foreground">{order.shipping_address}</p>
                        <p className="text-foreground">{order.shipping_city}, {order.shipping_state} - {order.shipping_pincode}</p>
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">Items</p>
                      <div className="space-y-1">
                        {order.order_items.map((item) => (
                          <div key={item.id} className="flex justify-between font-body text-sm">
                            <span className="text-foreground">{item.product_name} × {item.quantity}</span>
                            <span className="text-muted-foreground">₹{(Number(item.product_price) * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Edit / Tracking */}
                    {editingOrder === order.id ? (
                      <div className="border-t border-border pt-4 space-y-3">
                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Status</label>
                            <select
                              value={editForm.status}
                              onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                              className="w-full border border-border rounded-sm px-3 py-2 font-body text-sm bg-transparent text-foreground"
                            >
                              {statusOptions.map((s) => (
                                <option key={s} value={s}>{statusLabels[s]}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Courier Name</label>
                            <input
                              value={editForm.courierName}
                              onChange={(e) => setEditForm({ ...editForm, courierName: e.target.value })}
                              className="w-full border border-border rounded-sm px-3 py-2 font-body text-sm bg-transparent text-foreground"
                              placeholder="e.g. Delhivery, Shiprocket"
                            />
                          </div>
                          <div>
                            <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Tracking ID</label>
                            <input
                              value={editForm.courierTrackingId}
                              onChange={(e) => setEditForm({ ...editForm, courierTrackingId: e.target.value })}
                              className="w-full border border-border rounded-sm px-3 py-2 font-body text-sm bg-transparent text-foreground"
                              placeholder="Tracking number"
                            />
                          </div>
                          <div>
                            <label className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-1 block">Est. Delivery</label>
                            <input
                              type="date"
                              value={editForm.estimatedDelivery}
                              onChange={(e) => setEditForm({ ...editForm, estimatedDelivery: e.target.value })}
                              className="w-full border border-border rounded-sm px-3 py-2 font-body text-sm bg-transparent text-foreground"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => handleUpdate(order.id)} className="gold-gradient text-primary-foreground font-body text-xs uppercase tracking-wider border-none hover:opacity-90">
                            Save Changes
                          </Button>
                          <Button variant="outline" onClick={() => setEditingOrder(null)} className="font-body text-xs uppercase tracking-wider">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" onClick={() => startEdit(order)} className="font-body text-xs uppercase tracking-wider">
                          <Truck size={14} className="mr-1" /> Update Order
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
