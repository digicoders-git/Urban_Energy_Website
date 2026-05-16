import { useState, useMemo, useEffect } from 'react'
import { FaCalendarAlt, FaClock, FaEye } from 'react-icons/fa'

const API = import.meta.env.VITE_API_URL

const CATEGORIES = ['All Posts', 'Education', 'Government', 'Comparison', 'Products', 'News']
const POSTS_PER_PAGE = 6
const DEFAULT_IMG = 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80'

function mapBlog(b) {
  const words = (b.content || '').replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean)
  return {
    id:       b._id,
    title:    b.title,
    excerpt:  words.slice(0, 28).join(' ') + (words.length > 28 ? '...' : ''),
    category: b.category,
    date:     new Date(b.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    views:    b.views || 0,
    readTime: Math.max(1, Math.ceil(words.length / 200)) + ' min',
    image:    b.thumb || DEFAULT_IMG,
    content:  b.content || '',
  }
}

// ── Toast ──────────────────────────────────────────────────────────────────
function Toast({ msg, visible }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white text-navy px-5 py-3 rounded-xl border-l-4 border-orange text-sm font-semibold shadow-2xl transition-all duration-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
      ✓ {msg}
    </div>
  )
}

// ── Filter Bar ─────────────────────────────────────────────────────────────
function FilterBar({ activeFilter, setFilter, sort, setSort }) {
  return (
    <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setFilter(cat === 'All Posts' ? 'all' : cat)}
            className={`px-4 py-2 rounded-full border text-xs font-bold transition-all ${(activeFilter === 'all' && cat === 'All Posts') || activeFilter === cat ? 'bg-[#FF7A00] border-[#FF7A00] text-white' : 'bg-white border-slate-200 text-slate-500 hover:border-[#FF7A00] hover:text-[#FF7A00]'}`}>
            {cat}
          </button>
        ))}
      </div>
      <select value={sort} onChange={e => setSort(e.target.value)}
        className="px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-500 bg-white outline-none cursor-pointer hover:border-[#FF7A00] transition-colors">
        <option value="newest">Newest First</option>
        <option value="views">Most Viewed</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  )
}

// ── Blog Card ──────────────────────────────────────────────────────────────
function BlogCard({ post, onClick }) {
  return (
    <div onClick={() => onClick(post)}
      className="group bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-44 overflow-hidden">
        <img src={post.image} alt={post.title} loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 z-10 bg-[#0B1F3A]/75 backdrop-blur-sm text-[#FFC107] text-[10px] font-bold px-2.5 py-1 rounded-full">{post.category}</span>
      </div>
      <div className="p-4 md:p-5">
        <h3 className="text-sm md:text-base font-black text-[#0B1F3A] leading-snug mb-2 group-hover:text-[#FF7A00] transition-colors line-clamp-2">{post.title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-[11px] text-slate-400 flex items-center gap-1"><FaCalendarAlt className="text-[9px]" /> {post.date}</span>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400 flex items-center gap-1"><FaClock className="text-[9px]" /> {post.readTime}</span>
            <span className="text-[11px] text-slate-400 flex items-center gap-1"><FaEye className="text-[9px]" /> {post.views.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Featured Card ──────────────────────────────────────────────────────────
function FeaturedCard({ post, onClick }) {
  return (
    <div onClick={() => onClick(post)}
      className="group bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 mb-6">
      <div className="relative h-72 overflow-hidden">
        <img src={post.image} alt={post.title} loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/70 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 z-10 bg-[#FF7A00] text-white text-[10px] font-black px-3 py-1.5 rounded-full">⭐ Featured</span>
        <span className="absolute top-4 right-4 z-10 bg-[#0B1F3A]/70 backdrop-blur-sm text-[#FFC107] text-[10px] font-bold px-3 py-1.5 rounded-full">{post.category}</span>
      </div>
      <div className="p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-black text-[#0B1F3A] leading-tight mb-3 group-hover:text-[#FF7A00] transition-colors">{post.title}</h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mb-5">
          <span className="flex items-center gap-1"><FaCalendarAlt className="text-[10px]" /> {post.date}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="flex items-center gap-1"><FaClock className="text-[10px]" /> {post.readTime} read</span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="flex items-center gap-1"><FaEye className="text-[10px]" /> {post.views.toLocaleString('en-IN')} views</span>
        </div>
        <span className="inline-flex items-center gap-2 text-[#FF7A00] font-bold text-sm group-hover:gap-3 transition-all">Read Article →</span>
      </div>
    </div>
  )
}

// ── Full Blog Detail Page ──────────────────────────────────────────────────
function BlogDetail({ post, allPosts, onBack, onOpen, showToast }) {
  const related = allPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2)

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {})
    showToast('Link copied!')
  }

  return (
    <div className="animate-fade-in">
      {/* Back */}
      <button onClick={onBack}
        className="inline-flex items-center gap-2 bg-white border border-slate-200 text-[#0B1F3A] font-bold text-sm px-4 py-2.5 rounded-xl mb-6 hover:border-[#FF7A00] hover:text-[#FF7A00] transition-all">
        ← Back to Blog
      </button>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-8">
        {/* Hero Image */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/60 via-transparent to-transparent" />
          <span className="absolute top-5 left-5 bg-[#FF7A00]/90 text-white text-xs font-bold px-3 py-1.5 rounded-full">{post.category}</span>
        </div>

        {/* Meta */}
        <div className="px-6 md:px-10 py-4 border-b border-slate-100 flex flex-wrap items-center gap-4">
          <span className="text-xs text-slate-400 flex items-center gap-1.5"><FaCalendarAlt /> {post.date}</span>
          <span className="text-xs text-slate-400 flex items-center gap-1.5"><FaClock /> {post.readTime} read</span>
          <span className="text-xs text-slate-400 flex items-center gap-1.5"><FaEye /> {post.views.toLocaleString('en-IN')} views</span>
        </div>

        {/* Content */}
        <div className="px-6 md:px-10 py-8">
          <h1 className="text-2xl md:text-4xl font-black text-[#0B1F3A] leading-tight mb-4">{post.title}</h1>
          <p className="text-base text-slate-500 leading-relaxed mb-8 border-l-4 border-[#FF7A00] pl-4 italic">{post.excerpt}</p>
          {post.content
            ? <div className="prose-custom" dangerouslySetInnerHTML={{ __html: post.content }} />
            : <p className="text-slate-400 text-sm">No content available.</p>
          }
        </div>

        {/* Share */}
        <div className="px-6 md:px-10 py-5 bg-slate-50 border-t border-slate-100 flex items-center gap-3 flex-wrap">
          <span className="text-sm font-bold text-[#0B1F3A]">Share:</span>
          <button onClick={copyLink}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-[#0B1F3A] hover:border-[#FF7A00] hover:text-[#FF7A00] transition-all">
            🔗 Copy Link
          </button>
          <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`}
            target="_blank" rel="noreferrer"
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-[#0B1F3A] hover:border-[#FF7A00] hover:text-[#FF7A00] transition-all">
            💬 WhatsApp
          </a>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h3 className="text-lg font-black text-[#0B1F3A] mb-5">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {related.map(p => <BlogCard key={p.id} post={p} onClick={onOpen} />)}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Sidebar ────────────────────────────────────────────────────────────────
function Sidebar({ posts, onOpen, onSearch, showToast }) {
  const [email, setEmail] = useState('')
  const recent = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4)
  const cats = {}
  posts.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1 })

  return (
    <aside className="flex flex-col gap-5">
      {/* Newsletter */}
      <div className="relative bg-white border border-slate-200 rounded-2xl p-6 overflow-hidden text-center">
        <div className="relative z-10">
          <div className="text-2xl mb-2">☀</div>
          <h4 className="text-navy font-black text-base mb-2">Solar Weekly</h4>
          <p className="text-slate-400 text-xs leading-relaxed mb-4">Get latest solar tips, subsidy updates & savings guides.</p>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email address"
            className="w-full bg-slate-50 border border-gray-200 rounded-lg px-3 py-2.5 text-navy text-sm placeholder-slate-400 outline-none focus:border-orange mb-2.5 transition-colors" />
          <button onClick={() => { showToast('Subscribed! Welcome to Solar Weekly.'); setEmail('') }}
            className="w-full bg-orange hover:bg-orange/90 text-white font-bold text-sm py-2.5 rounded-lg transition-colors">
            Subscribe Free →
          </button>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <h4 className="text-sm font-black text-[#0B1F3A] pb-2 border-b-2 border-[#FF7A00] inline-block">Recent Posts</h4>
        <div className="mt-4 flex flex-col">
          {recent.map(p => (
            <button key={p.id} onClick={() => onOpen(p)}
              className="flex gap-3 py-3 border-b border-slate-100 last:border-0 hover:opacity-70 transition-opacity text-left">
              <div className="relative w-14 h-11 rounded-lg overflow-hidden flex-shrink-0">
                <img src={p.image} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-bold text-[#0B1F3A] leading-snug line-clamp-2 mb-0.5">{p.title}</p>
                <span className="text-[11px] text-slate-400">{p.date} · {p.readTime}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <h4 className="text-sm font-black text-[#0B1F3A] pb-2 border-b-2 border-[#FF7A00] inline-block">Categories</h4>
        <div className="mt-4">
          {Object.entries(cats).map(([cat, count]) => (
            <button key={cat} onClick={() => onSearch(cat)}
              className="flex justify-between items-center w-full py-2.5 border-b border-slate-100 last:border-0 hover:opacity-70 transition-opacity group">
              <span className="text-sm font-semibold text-[#0B1F3A] group-hover:text-[#FF7A00] transition-colors">{cat}</span>
              <span className="bg-[#FF7A00]/10 text-[#FF7A00] text-[11px] font-bold px-2.5 py-0.5 rounded-full">{count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#FF7A00] to-[#ff9500] rounded-2xl p-6 text-center">
        <div className="text-white font-black text-base mb-2">Calculate Your Savings</div>
        <div className="text-white/75 text-xs leading-relaxed mb-4">Find out exactly how much you can save with rooftop solar.</div>
        <a href="/calculator" className="block w-full bg-white text-[#FF7A00] font-black text-sm py-2.5 rounded-lg hover:bg-orange-50 transition-colors">
          Try Calculator →
        </a>
      </div>
    </aside>
  )
}

// ── Pagination ─────────────────────────────────────────────────────────────
function Pagination({ current, total, onChange }) {
  if (total <= 1) return null
  return (
    <div className="flex justify-center gap-2 mt-10">
      {Array.from({ length: total }, (_, i) => i + 1).map(n => (
        <button key={n} onClick={() => onChange(n)}
          className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${n === current ? 'bg-[#FF7A00] text-white' : 'bg-white border border-slate-200 text-slate-400 hover:border-[#FF7A00] hover:text-[#FF7A00]'}`}>
          {n}
        </button>
      ))}
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [posts, setPosts]         = useState([])
  const [loading, setLoading]     = useState(true)
  const [filter, setFilter]       = useState('all')
  const [sort, setSort]           = useState('newest')
  const [search, setSearch]       = useState('')
  const [page, setPage]           = useState(1)
  const [activePost, setActivePost] = useState(null)
  const [toast, setToast]         = useState({ visible: false, msg: '' })

  useEffect(() => {
    fetch(`${API}/blogs/published`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setPosts(data.map(mapBlog)) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const showToast = (msg) => {
    setToast({ visible: true, msg })
    setTimeout(() => setToast({ visible: false, msg: '' }), 2800)
  }

  // Open blog: call view API then show
  const openPost = (p) => {
    fetch(`${API}/blogs/${p.id}/view`, { method: 'GET' })
      .then(r => r.json())
      .then(updated => {
        const updatedPost = { ...p, views: updated.views ?? p.views + 1 }
        setPosts(prev => prev.map(b => b.id === p.id ? updatedPost : b))
        setActivePost(updatedPost)
      })
      .catch(() => setActivePost(p))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closePost = () => { setActivePost(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const handleSearch = (q) => { setSearch(q); setPage(1); setFilter('all') }
  const handleFilter = (f) => { setFilter(f); setPage(1); setSearch('') }

  const filtered = useMemo(() => {
    let list = [...posts]
    if (filter !== 'all') list = list.filter(p => p.category === filter)
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q))
    }
    if (sort === 'views')   list.sort((a, b) => b.views - a.views)
    else if (sort === 'oldest') list.sort((a, b) => new Date(a.date) - new Date(b.date))
    else list.sort((a, b) => new Date(b.date) - new Date(a.date))
    return list
  }, [posts, filter, sort, search])

  const featured   = filter === 'all' && !search && page === 1 ? filtered[0] : null
  const gridPosts  = featured ? filtered.slice(1) : filtered
  const totalPages = Math.ceil(gridPosts.length / POSTS_PER_PAGE)
  const paginated  = gridPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  if (loading) return (
    <div className="min-h-screen bg-[#F7F9FC] flex items-center justify-center">
      <div className="text-center"><div className="text-5xl mb-4">☀</div><p className="text-slate-500 font-semibold">Loading blogs...</p></div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        .prose-custom h2{font-size:1.25rem;font-weight:800;color:#0B1F3A;margin:1.8rem 0 0.7rem}
        .prose-custom h3{font-size:1.05rem;font-weight:700;color:#0B1F3A;margin:1.4rem 0 0.5rem}
        .prose-custom p{font-size:0.95rem;color:#374151;line-height:1.9;margin-bottom:1rem}
        .prose-custom ul,.prose-custom ol{padding-left:1.4rem;margin-bottom:1rem}
        .prose-custom li{font-size:0.95rem;color:#374151;line-height:1.8;margin-bottom:0.4rem}
        .prose-custom strong{font-weight:700;color:#0B1F3A}
        .prose-custom a{color:#FF7A00;text-decoration:underline}
        .prose-custom .highlight-box{background:linear-gradient(135deg,rgba(255,122,0,0.06),rgba(255,193,7,0.04));border:1px solid rgba(255,122,0,0.2);border-left:4px solid #FF7A00;border-radius:0 12px 12px 0;padding:16px 20px;margin:1.2rem 0}
        .prose-custom .highlight-box p{color:#0B1F3A;font-weight:500;margin:0}
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        @keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .animate-fade-in{animation:fadeIn 0.35s ease both}
      `}</style>

      {/* Hero */}
      <div className="relative bg-slate-50 overflow-hidden border-b border-gray-200">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-orange/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 py-10 md:py-14 flex justify-center">
          <div className="max-w-2xl flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 bg-orange/10 border border-orange/25 text-orange text-xs font-bold px-4 py-1.5 rounded-full mb-5">☀ Solar Knowledge Hub</span>
            <h1 className="text-5xl md:text-6xl font-black text-navy leading-[1.08] tracking-tighter mb-4">
              Learn. Save.<br />
              <span className="glow-text">Go Solar.</span>
            </h1>
            <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-lg mb-8">
              Expert guides, government scheme updates, and real solar savings stories.
            </p>
            <div className="flex gap-8 pt-6 border-t border-gray-200 w-full justify-center">
              {[{ n: posts.length, l: 'Articles' }, { n: '24.8K', l: 'Monthly Readers' }, { n: CATEGORIES.length - 1, l: 'Categories' }].map(s => (
                <div key={s.l} className="text-center">
                  <div className="text-2xl font-black text-orange">{s.n}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 uppercase tracking-wider">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-8 items-start">
          <main>
            {activePost ? (
              <BlogDetail post={activePost} allPosts={posts} onBack={closePost} onOpen={openPost} showToast={showToast} />
            ) : (
              <div className="animate-fade-in">
                <FilterBar activeFilter={filter} setFilter={handleFilter} sort={sort} setSort={v => { setSort(v); setPage(1) }} />
                {posts.length === 0 ? (
                  <div className="text-center py-20 text-slate-400">
                    <div className="text-5xl opacity-40 mb-4">☀</div>
                    <p className="font-bold text-base mb-1">No posts published yet</p>
                    <p className="text-sm">Check back soon for solar guides and updates.</p>
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="text-center py-20 text-slate-400">
                    <p className="font-bold text-base mb-1">No posts found</p>
                    <p className="text-sm">Try a different search or category.</p>
                  </div>
                ) : (
                  <>
                    {featured && <FeaturedCard post={featured} onClick={openPost} />}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {paginated.map(p => <BlogCard key={p.id} post={p} onClick={openPost} />)}
                    </div>
                    <Pagination current={page} total={totalPages} onChange={n => { setPage(n); window.scrollTo({ top: 400, behavior: 'smooth' }) }} />
                  </>
                )}
              </div>
            )}
          </main>

          <div className="hidden lg:block sticky top-20">
            <Sidebar posts={posts} onOpen={openPost} onSearch={handleSearch} showToast={showToast} />
          </div>
        </div>
      </div>

      <Toast msg={toast.msg} visible={toast.visible} />
    </div>
  )
}
