import { useState } from 'react';
import { NEWS_ARTICLES } from '../../data/sampleData';
import { formatDate } from '../../utils/helpers';
import { Badge, Button, SectionHeader, Modal, Input, Select, Tabs, SearchInput } from '../../components/ui';

const CATEGORIES = ['Achievement', 'Alumni Success', 'CSR Partnership', 'Fundraising', 'Event', 'Announcement'];

export default function CMS() {
  const [tab, setTab] = useState('articles');
  const [selected, setSelected] = useState(null);
  const [newOpen, setNewOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = NEWS_ARTICLES.filter(a =>
    !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 page-enter">
      <SectionHeader
        title="Content Management"
        subtitle="Manage news, success stories & announcements"
        actions={
          <Button variant="primary" onClick={() => setNewOpen(true)}>+ New Article</Button>
        }
      />

      <Tabs
        tabs={[
          { id: 'articles', label: '📰 News & Articles' },
          { id: 'stories', label: '⭐ Success Stories' },
          { id: 'announcements', label: '📣 Announcements' },
        ]}
        active={tab}
        onChange={setTab}
      />

      <div className="flex items-center gap-3 mb-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search articles…" className="max-w-sm" />
        <select className="select w-40">
          <option>All Categories</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(article => (
          <div key={article.id} className="card cursor-pointer group" onClick={() => setSelected(article)}>
            <div className="flex items-start gap-4">
              <div className="text-4xl flex-shrink-0 p-3 rounded-xl" style={{ background: 'rgba(123,28,46,0.15)', border: '1px solid rgba(123,28,46,0.3)' }}>
                {article.image}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge-gold text-[10px]">{article.category}</span>
                  <span className="text-[10px]" style={{ color: '#6b5a5f' }}>{formatDate(article.date)}</span>
                </div>
                <h3 className="text-sm font-semibold text-[#f5ede0] leading-snug mb-2 group-hover:text-gradient">
                  {article.title}
                </h3>
                <p className="text-xs line-clamp-2" style={{ color: '#9e8a7a' }}>{article.excerpt}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs" style={{ color: '#6b5a5f' }}>By {article.author}</span>
                  <div className="flex gap-1 ml-auto">
                    <button className="btn-ghost px-2 py-1 text-[10px]">✏️ Edit</button>
                    <button className="btn-ghost px-2 py-1 text-[10px]">📤 Publish</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Article Preview" size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="badge-gold">{selected.category}</span>
              <span className="text-xs" style={{ color: '#9e8a7a' }}>Published {formatDate(selected.date)} · By {selected.author}</span>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-5xl">{selected.image}</div>
              <div>
                <h2 className="text-lg font-bold text-[#f5ede0] mb-2">{selected.title}</h2>
                <p className="text-sm" style={{ color: '#9e8a7a' }}>{selected.excerpt}</p>
              </div>
            </div>
            <div className="p-4 rounded-xl text-sm" style={{ background: '#160d0f', border: '1px solid #3d2228', color: '#9e8a7a', lineHeight: '1.7' }}>
              This is a preview of the full article content. In production, the complete article body would be stored in the database and rendered here with rich text formatting, images, and media embeds.
              <br /><br />
              The MCC Alumni & Development Portal supports full WYSIWYG editing for news articles, success stories, CSR partnership highlights, and departmental updates. Content can be scheduled, drafted, and published with version control.
            </div>
            <div className="flex gap-2">
              <Button variant="primary">✏️ Edit Article</Button>
              <Button variant="gold">📤 Publish Now</Button>
              <Button variant="ghost">🔗 Copy Link</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* New Article Modal */}
      <Modal open={newOpen} onClose={() => setNewOpen(false)} title="Create New Article" size="lg">
        <div className="space-y-4">
          <Input label="Article Title" placeholder="MCC Ranks Among Top Colleges in NIRF 2024" />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Category" options={CATEGORIES} />
            <Input label="Author" placeholder="Communications Office" />
          </div>
          <div>
            <label className="input-label">Excerpt / Summary</label>
            <textarea className="input" rows={2} placeholder="Brief summary shown in listings and previews…" />
          </div>
          <div>
            <label className="input-label">Full Content</label>
            <textarea className="input" rows={6} placeholder="Full article content. Markdown supported…" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Featured Image URL" placeholder="https://…" />
            <Input label="Publish Date" type="datetime-local" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setNewOpen(false)}>Save Draft</Button>
            <Button variant="primary" onClick={() => setNewOpen(false)}>Publish Article</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
