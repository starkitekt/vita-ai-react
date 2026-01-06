import React, { memo, useState } from 'react';

const ChatSidebar = memo(({ collapsed, onToggle }) => {
    const [folders, setFolders] = useState([
        { id: 'f1', name: 'Active Cases', count: 3 },
        { id: 'f2', name: 'Clinical Research', count: 0 },
        { id: 'f3', name: 'Education', count: 2 }
    ]);

    const [editingFolder, setEditingFolder] = useState(null);

    const historyItems = [
        { id: 'h1', title: 'AMI Protocol • Male 62y', folder: 'f1', type: 'Emergency' },
        { id: 'h2', title: 'Asthma Stepwise • Ped 8y', folder: 'f1', type: 'Chronic' },
        { id: 'h3', title: 'CKD + RA Management', folder: 'f1', type: 'Complex' },
        { id: 'h4', title: 'Sildenafil Interaction Risk', folder: 'f3', type: 'Pharma' },
        { id: 'h5', title: 'Chronic Cough DDx', folder: 'f3', type: 'Diag' }
    ];

    const handleRename = (id, newName) => {
        setFolders(prev => prev.map(f => f.id === id ? { ...f, name: newName } : f));
        setEditingFolder(null);
    };

    return (
        <aside
            className={`sidebar ${collapsed ? 'collapsed' : ''}`}
            style={{ width: collapsed ? '64px' : '280px', transition: 'width 0.3s var(--ease-out)', position: 'relative', background: 'var(--white)', borderRight: '1px solid var(--grey-100)' }}
            aria-label="Clinical Navigation"
        >
            <div className="sidebar-header" style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between' }}>
                <a href="/" className="sidebar-logo" aria-label="Vita AI Homepage" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <div className="logo-mark" style={{ width: '32px', height: '32px', background: 'var(--grey-900)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-md)', fontWeight: 'bold' }}>V</div>
                    {!collapsed && <span style={{ fontWeight: 'bold', color: 'var(--grey-900)', letterSpacing: '0.05em' }}>VITA AI</span>}
                </a>

                {!collapsed && (
                    <button className="btn btn-icon" aria-label="New Session" style={{ borderRadius: 'var(--radius-md)', background: 'var(--grey-50)', width: '32px', height: '32px' }}>
                        <svg className="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                )}
            </div>

            {!collapsed && (
                <div className="sidebar-scroll" style={{ overflowY: 'auto', height: 'calc(100vh - 120px)', padding: '0 var(--space-4)' }}>
                    <div className="sidebar-search" style={{ margin: 'var(--space-2) 0 var(--space-6)' }}>
                        <div className="search-container" style={{ position: 'relative' }}>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search clinical history..."
                                style={{ width: '100%', padding: 'var(--space-2.5) var(--space-8)', background: 'var(--grey-50)', border: '1px solid var(--grey-100)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-xs)' }}
                            />
                            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '14px', color: 'var(--grey-400)' }}>
                                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                            </svg>
                        </div>
                    </div>

                    <nav className="dossier-nav">
                        <div className="section-label" style={{ fontSize: '10px', fontWeight: '700', color: 'var(--grey-400)', textTransform: 'uppercase', marginBottom: 'var(--space-3)', letterSpacing: '0.05em' }}>Patient Dossiers</div>

                        {folders.map(folder => (
                            <div key={folder.id} className="folder-group" style={{ marginBottom: 'var(--space-6)' }}>
                                <div className="folder-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-1.5) 0', cursor: 'pointer', group: 'true' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                        <svg className="icon icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: 'var(--grey-400)' }}>
                                            <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 2h9a2 2 0 012 2v12z" />
                                        </svg>
                                        {editingFolder === folder.id ? (
                                            <input
                                                autoFocus
                                                style={{ border: 'none', background: 'var(--grey-50)', fontSize: 'var(--text-xs)', fontWeight: '600', width: '120px' }}
                                                defaultValue={folder.name}
                                                onBlur={(e) => handleRename(folder.id, e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleRename(folder.id, e.target.value)}
                                            />
                                        ) : (
                                            <span
                                                style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: 'var(--grey-700)' }}
                                                onDoubleClick={() => setEditingFolder(folder.id)}
                                            >
                                                {folder.name}
                                            </span>
                                        )}
                                    </div>
                                    <span style={{ fontSize: '10px', color: 'var(--grey-300)' }}>{folder.count}</span>
                                </div>

                                <div className="folder-contents" style={{ borderLeft: '1px solid var(--grey-100)', marginLeft: '6px', paddingLeft: '12px' }}>
                                    {historyItems.filter(h => h.folder === folder.id).map(item => (
                                        <div key={item.id} className="history-item" style={{ padding: 'var(--space-2) 0', cursor: 'pointer' }}>
                                            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--grey-500)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={item.title}>
                                                {item.title}
                                            </div>
                                            <div style={{ fontSize: '8px', color: 'var(--grey-300)', textTransform: 'uppercase', letterSpacing: '0.02em', marginTop: '2px' }}>{item.type}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>
            )}

            {!collapsed && (
                <div className="sidebar-footer" style={{ position: 'absolute', bottom: '56px', left: 0, width: '100%', padding: 'var(--space-3) var(--space-4)', borderTop: '1px solid var(--grey-100)', background: 'white' }}>
                    <a href="/pathways" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--grey-600)', textDecoration: 'none', borderRadius: 'var(--radius-md)', transition: 'background 0.2s', marginBottom: 'var(--space-2)' }}>
                        <svg className="icon icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: '14px' }}>
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                        <span>Clinical Pathways</span>
                    </a>
                    <a href="/about" className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--grey-600)', textDecoration: 'none', borderRadius: 'var(--radius-md)', transition: 'background 0.2s' }}>
                        <svg className="icon icon-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: '14px' }}>
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                        </svg>
                        <span>About VITA AI</span>
                    </a>
                </div>
            )}

            <button
                className="collapse-btn"
                onClick={onToggle}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                style={{ position: 'absolute', bottom: '0', left: 0, width: '100%', background: 'white', borderTop: '1px solid var(--grey-100)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)', color: 'var(--grey-400)', padding: 'var(--space-4)' }}
            >
                <svg style={{ width: '16px', transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="15,18 9,12 15,6" />
                </svg>
                {!collapsed && <span style={{ fontSize: 'var(--text-xs)', fontWeight: '600' }}>Minimize Interface</span>}
            </button>
        </aside>
    );
});

ChatSidebar.displayName = 'ChatSidebar';
export default ChatSidebar;
