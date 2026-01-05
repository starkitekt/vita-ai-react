import React, { memo } from 'react';

const ChatSidebar = memo(({ collapsed, onToggle }) => {
    return (
        <aside
            className={`sidebar ${collapsed ? 'collapsed' : ''}`}
            style={{ width: collapsed ? '64px' : '260px', transition: 'width 0.3s var(--ease-out)', position: 'relative' }}
            aria-label="Clinical Navigation"
        >
            <div className="sidebar-header" style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between' }}>
                <a href="/" className="sidebar-logo" aria-label="Vita AI Homepage" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <div className="logo-mark" style={{ width: '32px', height: '32px', background: 'var(--grey-900)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-md)', fontWeight: 'bold' }}>V</div>
                    {!collapsed && <span style={{ fontWeight: 'bold', color: 'var(--grey-900)' }}>VITA</span>}
                </a>

                {!collapsed && (
                    <button className="btn btn-icon" aria-label="New Session" style={{ borderRadius: '50%', background: 'var(--grey-50)' }}>
                        <svg className="icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                )}
            </div>

            {!collapsed && (
                <div className="sidebar-search" style={{ padding: '0 var(--space-4) var(--space-4)' }}>
                    <div className="search-container" style={{ position: 'relative' }}>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search chats..."
                            style={{ width: '100%', padding: 'var(--space-2) var(--space-8)', background: 'var(--grey-50)', border: '1px solid var(--grey-100)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)' }}
                            aria-label="Search conversation history"
                        />
                        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', width: '14px', color: 'var(--grey-400)' }}>
                            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                        </svg>
                    </div>
                </div>
            )}

            <nav className="workspace-nav" style={{ padding: '0 var(--space-2)' }}>
                {!collapsed && <div className="workspace-label" style={{ padding: 'var(--space-2) var(--space-4)', fontSize: '10px', fontWeight: '700', color: 'var(--grey-400)', textTransform: 'uppercase' }}>Workspace</div>}
                <div className="workspace-item active" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)', background: 'var(--grey-50)', color: 'var(--grey-900)', cursor: 'pointer' }}>
                    <svg className="workspace-icon icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    {!collapsed && <span style={{ fontSize: 'var(--text-sm)' }}>All Chats</span>}
                </div>
            </nav>

            <button
                className="collapse-btn"
                onClick={onToggle}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                style={{ position: 'absolute', bottom: '20px', left: 0, width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)', color: 'var(--grey-400)', padding: 'var(--space-3)' }}
            >
                <svg style={{ width: '16px', transform: collapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="15,18 9,12 15,6" />
                </svg>
                {!collapsed && <span style={{ fontSize: 'var(--text-xs)', fontWeight: '600' }}>Collapse</span>}
            </button>
        </aside>
    );
});

ChatSidebar.displayName = 'ChatSidebar';
export default ChatSidebar;
