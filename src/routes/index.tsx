import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ExternalLink, MoreVertical, Star, Heart, Sun, Coffee, Leaf, Moon, Info, Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import productAsset from "@/assets/morning-citrus.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "晨雾柑橘 · 商品详情" },
    { name: "description", content: "清晨的薄雾中，柑橘与绿意交织，带来干净清新的气息。晨雾柑橘淡香水，30ml。" },
    { property: "og:title", content: "晨雾柑橘 · 商品详情" },
    { property: "og:description", content: "自然、清新、优雅。探索晨雾柑橘的香调结构与香气画像。" },
    { property: "og:type", content: "product" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function SectionHeading({ title, caption }: { title: string; caption?: string }) {
  return <div className="section-heading"><h2>{title}</h2><span className="section-rule" />{caption && <span className="section-caption">{caption}</span>}</div>;
}

function ScentRadar() {
  return <svg className="scent-radar" viewBox="0 0 345 214" role="img" aria-label="香气画像：清新度4.5、花香感3.5、木质感3.0、持久度3.5、甜美度2.5">
    <g className="radar-grid">
      <polygon points="164,44 227,90 203,164 125,164 101,90" />
      <polygon points="164,60 211,95 193,150 135,150 117,95" />
      <polygon points="164,76 195,99 184,137 144,137 133,99" />
      <path d="M164 110V44M164 110L227 90M164 110L203 164M164 110L125 164M164 110L101 90" />
    </g>
    <polygon className="radar-value" points="164,71 202,97 184,138 140,141 137,101" />
    <g className="radar-label"><text x="164" y="28" textAnchor="middle">清新度</text><text x="164" y="46" textAnchor="middle" className="radar-number">4.5</text><text x="249" y="88">花香感</text><text x="256" y="109" className="radar-number">3.5</text><text x="225" y="175">木质感</text><text x="234" y="196" className="radar-number">3.0</text><text x="60" y="175">持久度</text><text x="69" y="196" className="radar-number">3.5</text><text x="37" y="91">甜美度</text><text x="47" y="111" className="radar-number">2.5</text></g>
  </svg>;
}

function BotanicalSprig() {
  return <svg className="botanical-sprig" viewBox="0 0 120 120" aria-hidden="true"><g><path d="M94 109Q74 72 43 46M81 86Q86 54 104 29M70 69Q61 37 82 7M62 63Q36 56 18 67" /><path d="M71 59Q54 33 82 7Q83 42 71 59ZM86 68Q86 39 104 29Q106 57 86 68ZM63 62Q37 36 20 41Q36 62 63 62ZM72 80Q45 68 27 87Q52 91 72 80ZM81 90Q68 63 54 62Q54 84 81 90ZM59 67Q34 54 18 67Q35 78 59 67Z" /><path d="M71 58L80 15M86 67L101 36M62 62L27 45M68 79L33 85" /></g></svg>;
}

function Index() {
  const [favorite, setFavorite] = useState(false);
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState<"cart" | "buy" | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const inform = (text: string) => { setNotice(text); window.setTimeout(() => setNotice(""), 3000); };
  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: "晨雾柑橘", text: "清晨的薄雾中，柑橘与绿意交织。", url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); inform("链接已复制"); }
    } catch { inform("未完成分享"); }
  };
  return <main className="perfume-page">
    <header className="product-header">
      <Button variant="perfumeIcon" size="icon" aria-label="返回" title="返回" onClick={() => { if (window.history.length > 1) window.history.back(); else inform("当前已是商品详情页"); }}><ChevronLeft /></Button>
      <h1>商品详情</h1>
      <div className="header-actions"><Button variant="perfumeIcon" size="icon" aria-label="分享商品" title="分享商品" onClick={share}><ExternalLink /></Button><Button variant="perfumeIcon" size="icon" aria-label="更多选项" title="更多选项" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><MoreVertical /></Button></div>
      {menuOpen && <div className="product-menu"><Button variant="perfumeQuiet" onClick={() => { setMenuOpen(false); setPanel("cart"); }}>购物车{inCart ? "（1）" : "（0）"}</Button><Button variant="perfumeQuiet" onClick={() => { setMenuOpen(false); document.getElementById("purchase-notes")?.scrollIntoView({ behavior: "smooth", block: "center" }); }}>购买须知</Button></div>}
    </header>
    <div className="product-photograph"><img src={productAsset.url} alt="晨雾柑橘30ml香水，透明玻璃瓶与新鲜柑橘、白色花朵置于阳光下的石台上" fetchPriority="high" /></div>
    <div className="product-content">
      <section className="product-intro" aria-label="商品信息">
        <div className="product-title-row"><h2>晨雾柑橘</h2><div className="product-price"><span>¥19.9</span><small>/ 30ml</small></div></div>
        <p className="product-description">清晨的薄雾中，柑橘与绿意交织，带来干净清新的气息。</p>
        <div className="product-social"><span className="rating"><Star /><span>4.8</span><small>（1.2k 评价）</small></span><span className="social-divider" /><Button variant="perfumeQuiet" className={favorite ? "favorite is-favorite" : "favorite"} aria-pressed={favorite} onClick={() => setFavorite(!favorite)}><Heart /><span>{favorite ? "已收藏" : "收藏"}</span><small>（{favorite ? "8.6k+" : "8.6k"}）</small></Button></div>
      </section>
      <section className="notes-section"><SectionHeading title="香调结构" caption="柑橘清新调" /><div className="fragrance-notes">{[{ name: "前调", feel: "清新 · 明亮", notes: ["柑橘", "佛手柑", "青柠"] }, { name: "中调", feel: "柔和 · 优雅", notes: ["绿茶", "茉莉"] }, { name: "后调", feel: "温暖 · 沉稳", notes: ["麝香", "雪松"] }].map(note => <div className="note-column" key={note.name}><h3>{note.name}</h3><p>{note.feel}</p><div className="note-tags">{note.notes.map(tag => <span key={tag}>{tag}</span>)}</div></div>)}</div></section>
      <section className="portrait-section"><SectionHeading title="香气画像" caption="清新不张扬 · 自然有层次" /><div className="scent-portrait"><ScentRadar /><div className="scent-character"><h3>香气特征</h3><div className="character-tags">{["清新自然", "干净通透", "温柔优雅", "适合日常"].map(tag => <span key={tag}>{tag}</span>)}</div></div></div></section>
      <section className="occasions-section"><SectionHeading title="适合场景" /><div className="occasion-list">{[{ Icon: Sun, text: "日常通勤" }, { Icon: Coffee, text: "约会聚会" }, { Icon: Leaf, text: "户外出行" }, { Icon: Moon, text: "夜晚独处" }].map(({ Icon, text }) => <span className="occasion" key={text}><Icon />{text}</span>)}</div></section>
      <aside className="purchase-notes" id="purchase-notes"><h3><Info />购买须知</h3><ul><li>本产品为正品香水，支持7天无理由退换（未拆封）。</li><li>30ml 规格，喷雾式包装，随身携带更方便。</li><li>由于个人肤质差异，香味留存时间可能有所不同。</li></ul><BotanicalSprig /></aside>
      <footer className="purchase-actions"><Button variant="perfumeOutline" onClick={() => { setInCart(true); inform("已加入购物车"); }}> {inCart && <Check />} {inCart ? "已加入购物车" : "加入购物车"}</Button><Button variant="perfumeBuy" onClick={() => setPanel("buy")}>立即购买 <span>¥19.9</span></Button></footer>
      <div className="home-indicator" aria-hidden="true" />
    </div>
    {notice && <div className="product-notice" role="status"><Check />{notice}</div>}
    <Dialog open={panel !== null} onOpenChange={open => { if (!open) setPanel(null); }}><DialogContent className="perfume-dialog"><DialogTitle>{panel === "cart" ? "购物车" : "确认商品"}</DialogTitle><DialogDescription>{panel === "cart" && !inCart ? "购物车暂时为空。" : "晨雾柑橘 · 淡香水 · 30ml"}</DialogDescription>{(panel === "buy" || inCart) && <><div className="order-product"><img src={productAsset.url} alt="晨雾柑橘香水" /><div><h3>晨雾柑橘</h3><p>30ml / ¥19.9</p></div></div><div className="quantity-row"><span>数量</span><div><Button variant="perfumeIcon" size="icon" aria-label="减少数量" disabled={quantity <= 1} onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus /></Button><span>{quantity}</span><Button variant="perfumeIcon" size="icon" aria-label="增加数量" onClick={() => setQuantity(quantity + 1)}><Plus /></Button></div></div><div className="order-total"><span>合计</span><strong>¥{(19.9 * quantity).toFixed(1)}</strong></div><p className="checkout-disclosure">当前为页面展示，暂未开通下单与支付。</p><Button variant="perfumeBuy" onClick={() => setPanel(null)}>继续浏览</Button></>}</DialogContent></Dialog>
  </main>;
}
