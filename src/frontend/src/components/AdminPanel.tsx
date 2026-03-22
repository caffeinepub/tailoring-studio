import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { CATEGORIES } from "../data/mockData";
import type { Design, Order } from "../types";

interface AdminPanelProps {
  designs: Design[];
  orders: Order[];
  onAddDesign: (d: Design) => void;
  onDeleteDesign: (id: string) => void;
  onUpdateOrderStatus: (id: string, status: Order["status"]) => void;
  onBack: () => void;
}

const GRADIENTS = [
  {
    id: "pink",
    value: "linear-gradient(135deg, #8B1A4A 0%, #C7507A 50%, #E8A0B4 100%)",
  },
  {
    id: "blue",
    value: "linear-gradient(135deg, #1A4A6B 0%, #2E7AB5 50%, #88BBD6 100%)",
  },
  {
    id: "red",
    value: "linear-gradient(135deg, #4A1010 0%, #8B2020 50%, #C06060 100%)",
  },
  {
    id: "green",
    value: "linear-gradient(135deg, #2D5A27 0%, #4A8F43 50%, #8BC48A 100%)",
  },
  {
    id: "purple",
    value: "linear-gradient(135deg, #5A1A8B 0%, #8B2ECA 50%, #B870E4 100%)",
  },
  {
    id: "navy",
    value: "linear-gradient(135deg, #0D1A4A 0%, #1A2E8B 50%, #4A60CA 100%)",
  },
];

const STATUS_COLORS: Record<Order["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  "in-progress": "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
};

export default function AdminPanel({
  designs,
  orders,
  onAddDesign,
  onDeleteDesign,
  onUpdateOrderStatus,
  onBack,
}: AdminPanelProps) {
  const [newDesign, setNewDesign] = useState({
    name: "",
    category: "blouse",
    price: "",
    description: "",
    badge: "",
    gradientId: "pink",
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddDesign = () => {
    if (!newDesign.name || !newDesign.price) {
      toast.error("Name and price are required.");
      return;
    }
    const gradient =
      GRADIENTS.find((g) => g.id === newDesign.gradientId)?.value ||
      GRADIENTS[0].value;
    const d: Design = {
      id: `d${Date.now()}`,
      name: newDesign.name,
      category: newDesign.category,
      price: Number.parseInt(newDesign.price, 10),
      description: newDesign.description,
      gradient,
      badge: newDesign.badge || undefined,
    };
    onAddDesign(d);
    setNewDesign({
      name: "",
      category: "blouse",
      price: "",
      description: "",
      badge: "",
      gradientId: "pink",
    });
    setIsAdding(false);
    toast.success("Design added successfully!");
  };

  return (
    <section className="min-h-screen bg-ivory pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-4 mb-8">
          <Button
            data-ocid="admin.back.button"
            variant="ghost"
            onClick={onBack}
            className="text-taupe hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
          </Button>
          <div>
            <h1 className="font-serif text-3xl text-foreground">Admin Panel</h1>
            <p className="text-taupe font-sans text-sm">
              Manage designs and orders
            </p>
          </div>
        </div>

        <Tabs defaultValue="designs">
          <TabsList
            data-ocid="admin.tabs"
            className="bg-card border border-gold/20 mb-6"
          >
            <TabsTrigger
              data-ocid="admin.designs.tab"
              value="designs"
              className="font-sans"
            >
              Designs ({designs.length})
            </TabsTrigger>
            <TabsTrigger
              data-ocid="admin.orders.tab"
              value="orders"
              className="font-sans"
            >
              Orders ({orders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="designs">
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-serif text-xl text-foreground">
                All Designs
              </h2>
              <Button
                data-ocid="admin.add.design.button"
                onClick={() => setIsAdding(!isAdding)}
                className="gradient-gold text-charcoal font-sans font-semibold rounded-full text-sm px-4 shadow-gold"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Design
              </Button>
            </div>

            {isAdding && (
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-gold/20 rounded-2xl p-6 mb-6 shadow-card"
              >
                <h3 className="font-serif text-lg text-foreground mb-4">
                  Add New Design
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-sans text-xs text-taupe uppercase tracking-wider">
                      Design Name *
                    </Label>
                    <Input
                      data-ocid="admin.design.name.input"
                      value={newDesign.name}
                      onChange={(e) =>
                        setNewDesign((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="e.g. Royal Silk Kurti"
                      className="mt-1 border-gold/20 focus:border-gold bg-ivory"
                    />
                  </div>
                  <div>
                    <Label className="font-sans text-xs text-taupe uppercase tracking-wider">
                      Category *
                    </Label>
                    <Select
                      value={newDesign.category}
                      onValueChange={(v) =>
                        setNewDesign((p) => ({ ...p, category: v }))
                      }
                    >
                      <SelectTrigger
                        data-ocid="admin.design.category.select"
                        className="mt-1 border-gold/20 bg-ivory"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="font-sans text-xs text-taupe uppercase tracking-wider">
                      Price (₹) *
                    </Label>
                    <Input
                      data-ocid="admin.design.price.input"
                      type="number"
                      value={newDesign.price}
                      onChange={(e) =>
                        setNewDesign((p) => ({ ...p, price: e.target.value }))
                      }
                      placeholder="e.g. 2500"
                      className="mt-1 border-gold/20 focus:border-gold bg-ivory"
                    />
                  </div>
                  <div>
                    <Label className="font-sans text-xs text-taupe uppercase tracking-wider">
                      Badge (optional)
                    </Label>
                    <Input
                      data-ocid="admin.design.badge.input"
                      value={newDesign.badge}
                      onChange={(e) =>
                        setNewDesign((p) => ({ ...p, badge: e.target.value }))
                      }
                      placeholder="e.g. New, Bestseller"
                      className="mt-1 border-gold/20 focus:border-gold bg-ivory"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="font-sans text-xs text-taupe uppercase tracking-wider">
                      Description
                    </Label>
                    <Textarea
                      data-ocid="admin.design.description.textarea"
                      value={newDesign.description}
                      onChange={(e) =>
                        setNewDesign((p) => ({
                          ...p,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Brief description of the design..."
                      className="mt-1 border-gold/20 focus:border-gold bg-ivory resize-none h-20"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="font-sans text-xs text-taupe uppercase tracking-wider">
                      Card Colour Theme
                    </Label>
                    <div className="flex gap-2 mt-1">
                      {GRADIENTS.map((g) => (
                        <button
                          type="button"
                          key={g.id}
                          onClick={() =>
                            setNewDesign((p) => ({ ...p, gradientId: g.id }))
                          }
                          className={`w-8 h-8 rounded-lg transition-all ${newDesign.gradientId === g.id ? "ring-2 ring-gold ring-offset-1" : ""}`}
                          style={{ background: g.value }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    data-ocid="admin.design.save.button"
                    onClick={handleAddDesign}
                    className="gradient-gold text-charcoal font-sans font-semibold rounded-full text-sm shadow-gold"
                  >
                    Save Design
                  </Button>
                  <Button
                    data-ocid="admin.design.cancel.button"
                    variant="ghost"
                    onClick={() => setIsAdding(false)}
                    className="text-taupe hover:text-foreground"
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}

            <div className="bg-card rounded-2xl border border-gold/20 shadow-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-gold/20">
                    <TableHead className="font-sans text-taupe">
                      Design
                    </TableHead>
                    <TableHead className="font-sans text-taupe">
                      Category
                    </TableHead>
                    <TableHead className="font-sans text-taupe">
                      Price
                    </TableHead>
                    <TableHead className="font-sans text-taupe">
                      Badge
                    </TableHead>
                    <TableHead className="font-sans text-taupe text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {designs.map((d, i) => (
                    <TableRow
                      key={d.id}
                      data-ocid={`admin.design.row.${i + 1}`}
                      className="border-gold/10"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex-shrink-0"
                            style={{ background: d.gradient }}
                          />
                          <span className="font-sans text-sm text-foreground font-medium">
                            {d.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-sans text-sm text-taupe capitalize">
                        {d.category}
                      </TableCell>
                      <TableCell className="font-serif text-sm text-foreground font-semibold">
                        ₹{d.price.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {d.badge && (
                          <Badge className="gradient-gold text-charcoal border-none font-sans text-xs">
                            {d.badge}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          data-ocid={`admin.design.delete.button.${i + 1}`}
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            onDeleteDesign(d.id);
                            toast.success("Design deleted.");
                          }}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <h2 className="font-serif text-xl text-foreground mb-5">
              All Orders
            </h2>
            <div className="bg-card rounded-2xl border border-gold/20 shadow-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-gold/20">
                    <TableHead className="font-sans text-taupe">
                      Design
                    </TableHead>
                    <TableHead className="font-sans text-taupe">
                      Customer
                    </TableHead>
                    <TableHead className="font-sans text-taupe">Date</TableHead>
                    <TableHead className="font-sans text-taupe">
                      Status
                    </TableHead>
                    <TableHead className="font-sans text-taupe">
                      Update
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((o, i) => (
                    <TableRow
                      key={o.id}
                      data-ocid={`admin.order.row.${i + 1}`}
                      className="border-gold/10"
                    >
                      <TableCell>
                        <div>
                          <p className="font-sans text-sm text-foreground font-medium">
                            {o.designName}
                          </p>
                          <p className="font-sans text-xs text-taupe capitalize">
                            {o.designCategory}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-sans text-sm text-foreground">
                            {o.customerName}
                          </p>
                          <p className="font-sans text-xs text-taupe">
                            {o.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-sans text-xs text-taupe">
                        {o.preferredDate}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-sans text-xs px-2 py-1 rounded-full ${STATUS_COLORS[o.status]}`}
                        >
                          {o.status.replace("-", " ")}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={o.status}
                          onValueChange={(v) =>
                            onUpdateOrderStatus(o.id, v as Order["status"])
                          }
                        >
                          <SelectTrigger
                            data-ocid={`admin.order.status.select.${i + 1}`}
                            className="h-8 text-xs border-gold/20 bg-ivory w-32"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="in-progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
