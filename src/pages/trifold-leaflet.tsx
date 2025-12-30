import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import DropletIcon from '@/components/widgets/DropletIcon';
import html2canvas from 'html2canvas';
import { 
  Truck, Calendar, Package, Box, Thermometer, Route, Navigation, Clock, 
  ShoppingCart, Link2, Snowflake, TrendingUp, Factory, 
  Shield, Bot, Building2, Boxes, Download
} from 'lucide-react';

function TrifoldLeafletInner() {
  const [loaded, setLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<'inside' | 'outside'>('outside');
  const [isDownloading, setIsDownloading] = useState(false);
  const outsideRef = useRef<HTMLDivElement>(null);
  const insideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const panelWidth = 374;
  const panelHeight = 794;

  const downloadImage = async (side: 'outside' | 'inside') => {
    const ref = side === 'outside' ? outsideRef : insideRef;
    if (!ref.current) return;
    
    setIsDownloading(true);
    
    try {
      const canvas = await html2canvas(ref.current, {
        scale: 3, // 3x 고해상도
        useCORS: true,
        allowTaint: true,
        backgroundColor: side === 'outside' ? '#ffffff' : '#0c0e12',
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `omelet-trifold-${side}-highres.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Download error:', error);
      alert('다운로드 중 오류가 발생했습니다.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1a2e',
      padding: '40px',
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      {/* View Mode Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <button
          onClick={() => setViewMode('outside')}
          style={{
            padding: '12px 32px',
            borderRadius: '8px',
            border: 'none',
            background: viewMode === 'outside' ? 'linear-gradient(135deg, #8B5CF6 0%, #10B981 100%)' : 'rgba(255,255,255,0.1)',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          바깥면 (접었을 때 보이는 면)
        </button>
        <button
          onClick={() => setViewMode('inside')}
          style={{
            padding: '12px 32px',
            borderRadius: '8px',
            border: 'none',
            background: viewMode === 'inside' ? 'linear-gradient(135deg, #8B5CF6 0%, #10B981 100%)' : 'rgba(255,255,255,0.1)',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          안쪽면 (펼쳤을 때)
        </button>
      </div>

      {/* Download Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '32px',
      }}>
        <button
          onClick={() => downloadImage('outside')}
          disabled={isDownloading}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.05)',
            color: '#fff',
            fontSize: '13px',
            fontWeight: 500,
            cursor: isDownloading ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: isDownloading ? 0.5 : 1,
          }}
        >
          <Download size={16} />
          바깥면 고화질 다운로드
        </button>
        <button
          onClick={() => downloadImage('inside')}
          disabled={isDownloading}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.05)',
            color: '#fff',
            fontSize: '13px',
            fontWeight: 500,
            cursor: isDownloading ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            opacity: isDownloading ? 0.5 : 1,
          }}
        >
          <Download size={16} />
          안쪽면 고화질 다운로드
        </button>
      </div>

      {/* Outside View (Always rendered for download, hidden when not active) */}
      <div 
        ref={outsideRef}
        style={{
          display: viewMode === 'outside' ? 'flex' : 'none',
          justifyContent: 'center',
          gap: '2px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out',
        }}
      >
        <PlatformPanel width={panelWidth} height={panelHeight} />
        <ProductsPanel width={panelWidth} height={panelHeight} />
        <FrontPanel width={panelWidth} height={panelHeight} />
      </div>

      {/* Inside View (Always rendered for download, hidden when not active) */}
      <div
        ref={insideRef}
        style={{
          display: viewMode === 'inside' ? 'flex' : 'none',
          justifyContent: 'center',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease-out',
        }}
      >
        <InsidePanel width={panelWidth * 3 + 4} height={panelHeight} />
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '32px',
        color: 'rgba(255,255,255,0.6)',
        fontSize: '14px',
      }}>
        {viewMode === 'outside' ? (
          <p>← 뒷면 (OaaSIS 플랫폼) | 중앙 (버티컬 제품들) | 앞면 (로고) →</p>
        ) : (
          <p>펼쳤을 때 안쪽 - CES 메인 포스터</p>
        )}
      </div>

      {/* Download Status */}
      {isDownloading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            background: '#1f2937',
            padding: '32px 48px',
            borderRadius: '16px',
            textAlign: 'center',
            color: '#fff',
          }}>
            <div style={{
              width: 40,
              height: 40,
              border: '3px solid rgba(139, 92, 246, 0.3)',
              borderTopColor: '#8B5CF6',
              borderRadius: '50%',
              margin: '0 auto 16px',
              animation: 'spin 1s linear infinite',
            }} />
            <p style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>고화질 이미지 생성 중...</p>
            <p style={{ margin: '8px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>잠시만 기다려주세요</p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function FrontPanel({ width, height }: { width: number; height: number }) {
  return (
    <div style={{
      width,
      height,
      background: '#2D00D0', // Deep artistic blue
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      color: '#ffffff',
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      {/* Background Large Overflowing Icon Shadow Effect - 회전 제거 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/omelet_icon.png"
        alt="Omelet Icon Shadow" 
        style={{
          position: 'absolute',
          right: '-30%',
          bottom: '10%',
          width: '110%',
          height: 'auto',
          opacity: 0.07,
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'brightness(0) invert(1)',
        }}
      />

      {/* Top Text Section - "Optimization AI Agent Platform" */}
      <div style={{ 
        position: 'absolute', 
        top: '40px', 
        left: '30px', 
        zIndex: 2,
        maxWidth: '240px'
      }}>
        <p style={{ 
          fontSize: '18px', 
          fontWeight: 700, 
          margin: 0, 
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          color: '#ffffff'
        }}>
          Optimization AI<br/>Agent Platform
        </p>
      </div>

      {/* Bold Vertical Text Section */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '0 30px',
        zIndex: 2,
        marginTop: '40px'
      }}>
        <h1 style={{ 
          fontSize: '44px', 
          fontWeight: 700, 
          lineHeight: 1, 
          margin: 0, 
          letterSpacing: '-0.02em'
        }}>
          <span style={{ display: 'block' }}>Optimization</span>
          <span style={{ display: 'block', color: 'rgba(255, 255, 255, 0.5)' }}>and</span>
          <span style={{ display: 'block' }}>machine</span>
          <span style={{ display: 'block' }}>
            le<span style={{ color: '#ffffff' }}>a</span>rning
          </span>
          <span style={{ display: 'block', color: 'rgba(255, 255, 255, 0.7)' }}>technologies:</span>
        </h1>
      </div>

      {/* Bottom Logo Section */}
      <div style={{
        padding: '30px',
        zIndex: 2,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start'
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/omelet-wordmark.png"
          alt="Omelet" 
          style={{ 
            height: '42px', 
            filter: 'brightness(0) invert(1)',
            opacity: 0.95
          }} 
        />
      </div>
    </div>
  );
}

// 왼쪽 패널 - OaaSIS Optimization AI Agent Platform 실제 구현 요소
function PlatformPanel({ width, height }: { width: number; height: number }) {
  const primaryColor = '#7c3aed'; // Omelet Purple
  const accentColor = '#10B981'; // Omelet Green
  const textDark = '#111827';
  const textMuted = '#6b7280';

  return (
    <div style={{ width, height, background: '#ffffff', padding: '32px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
      
      {/* Hero Header Section - Vertical Solutions와 통일된 구조 */}
      <div style={{ marginTop: '8px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {/* Left Side - Text */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{ width: 14, height: 2, background: primaryColor }} />
              <p style={{ 
                fontSize: 11, fontWeight: 700, color: primaryColor, margin: 0,
                letterSpacing: '0.15em', textTransform: 'uppercase',
              }}>GENERAL PLATFORM</p>
            </div>
            <h2 style={{ 
              fontSize: 28, fontWeight: 800, color: textDark, margin: '0 0 8px 0',
              letterSpacing: '-0.02em',
            }}>Agent Platform</h2>
            <p style={{ fontSize: 10, color: textMuted, margin: 0, lineHeight: 1.5, maxWidth: '90%' }}>
              Build & deploy <span style={{ color: primaryColor, fontWeight: 700 }}>optimization AI agents</span> with pre-built tools and workflows.
            </p>
          </div>
          
          {/* Right Side - Droplet Characters */}
          <div style={{ position: 'relative', width: 105, height: 90, flexShrink: 0, marginTop: 0 }}>
            <div style={{ position: 'absolute', top: 0, left: 20, transform: 'rotate(-8deg)' }}><DropletIcon size={34} colorTheme="grape" faceStyle="happy-polygon" /></div>
            <div style={{ position: 'absolute', top: 8, left: 58, transform: 'rotate(10deg)' }}><DropletIcon size={28} colorTheme="sunny" faceStyle="excited-polygon" /></div>
            <div style={{ position: 'absolute', top: 32, left: 0, transform: 'rotate(5deg)' }}><DropletIcon size={38} colorTheme="ocean" faceStyle="cool-rounded" /></div>
            <div style={{ position: 'absolute', top: 38, left: 40, transform: 'rotate(-5deg)' }}><DropletIcon size={32} colorTheme="rose" faceStyle="lovely-oval" /></div>
            <div style={{ position: 'absolute', top: 60, left: 68, transform: 'rotate(8deg)' }}><DropletIcon size={26} colorTheme="lavender" faceStyle="surprised-rounded" /></div>
          </div>
        </div>
      </div>

      {/* Tool Marketplace Section - 상세 설명 포함 */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <div style={{ width: 3, height: 12, background: accentColor, borderRadius: 2 }} />
          <p style={{ fontSize: 10, fontWeight: 700, color: textDark, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tool Marketplace</p>
          <span style={{ fontSize: 7, color: textMuted, marginLeft: 'auto' }}>MCP Servers</span>
        </div>
        <div style={{ borderRadius: 10, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
          {/* Window Header */}
          <div style={{ height: 18, background: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ marginLeft: 6, fontSize: 6, fontWeight: 600, color: textMuted }}>Platform Hub</span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 3 }}>
              <span style={{ fontSize: 5, color: '#10B981', background: '#d1fae5', padding: '1px 4px', borderRadius: 3 }}>12 tools</span>
            </div>
          </div>
          {/* Sidebar + Content */}
          <div style={{ display: 'flex', background: '#ffffff' }}>
            <div style={{ width: '54px', borderRight: '1px solid #e5e7eb', padding: '6px 4px', background: '#fcfcfd' }}>
              <p style={{ fontSize: 4, color: textMuted, margin: '0 0 4px 4px', fontWeight: 600, textTransform: 'uppercase' }}>Categories</p>
              {['Inventory', 'Routing', 'Staffing', 'Packing', 'Forecast'].map((item, i) => (
                <div key={i} style={{ fontSize: 5, color: i === 0 ? accentColor : textMuted, padding: '3px 4px', marginBottom: 2, borderRadius: 3, background: i === 0 ? `${accentColor}15` : 'transparent', fontWeight: i === 0 ? 600 : 400, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: i === 0 ? accentColor : '#d1d5db' }} />
                  {item}
                </div>
              ))}
            </div>
            {/* Main Content */}
            <div style={{ flex: 1, padding: '6px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
                {[
                  { name: 'Route MCP', desc: 'Vehicle routing & delivery scheduling', Icon: Route, rating: '4.9', installs: '2.3k' },
                  { name: 'Sched MCP', desc: 'Workforce task allocation engine', Icon: Calendar, rating: '4.8', installs: '1.8k' },
                  { name: 'Stock MCP', desc: 'Inventory optimization planner', Icon: Package, rating: '4.7', installs: '3.1k' },
                  { name: 'Fleet MCP', desc: 'Fleet tracking & dispatch system', Icon: Truck, rating: '4.9', installs: '2.0k' },
                  { name: 'Pack MCP', desc: '3D bin packing maximization', Icon: Box, rating: '4.6', installs: '1.5k' },
                  { name: 'Cold MCP', desc: 'Temperature & spoilage monitor', Icon: Thermometer, rating: '4.8', installs: '890' },
                ].map((tool, i) => (
                  <div key={i} style={{
                    background: '#ffffff', borderRadius: 8, padding: '6px', border: '1px solid #f3f4f6', textAlign: 'center'
                  }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 6, margin: '0 auto 4px',
                      background: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <tool.Icon style={{ width: 11, height: 11, color: '#4ade80' }} />
                    </div>
                    <p style={{ fontSize: 5.5, fontWeight: 700, color: textDark, margin: '0 0 2px 0' }}>{tool.name}</p>
                    <p style={{ fontSize: 3.5, color: textMuted, margin: '0 0 3px 0', lineHeight: 1.3, minHeight: 12 }}>{tool.desc}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 4, fontSize: 3.5 }}>
                      <span style={{ color: '#f59e0b' }}>★ {tool.rating}</span>
                      <span style={{ color: textMuted }}>{tool.installs}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Marketplace Section - 상세 설명 포함 */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <div style={{ width: 3, height: 10, background: primaryColor, borderRadius: 2 }} />
          <p style={{ fontSize: 10, fontWeight: 700, color: textDark, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Agent Marketplace</p>
          <span style={{ fontSize: 7, color: textMuted, marginLeft: 'auto' }}>Pre-built Agents</span>
        </div>
        <div style={{ borderRadius: 10, border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
          {/* Window Header */}
          <div style={{ height: 18, background: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 4 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ marginLeft: 6, fontSize: 6, fontWeight: 600, color: textMuted }}>Agent Hub</span>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 3 }}>
              <span style={{ fontSize: 5, color: primaryColor, background: '#f3e8ff', padding: '1px 4px', borderRadius: 3 }}>8 agents</span>
            </div>
          </div>
          {/* Sidebar + Content */}
          <div style={{ display: 'flex', background: '#ffffff' }}>
            <div style={{ width: '54px', borderRight: '1px solid #e5e7eb', padding: '6px 4px', background: '#fcfcfd' }}>
              <p style={{ fontSize: 4, color: textMuted, margin: '0 0 4px 4px', fontWeight: 600, textTransform: 'uppercase' }}>Browse</p>
              {['My Hub', 'Featured', 'Enterprise', 'Custom', 'Templates'].map((item, i) => (
                <div key={i} style={{ fontSize: 5, color: i === 1 ? primaryColor : textMuted, padding: '3px 4px', marginBottom: 2, borderRadius: 3, background: i === 1 ? `${primaryColor}15` : 'transparent', fontWeight: i === 1 ? 600 : 400, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: i === 1 ? primaryColor : '#d1d5db' }} />
                  {item}
                </div>
              ))}
            </div>
            <div style={{ flex: 1, padding: '6px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
                {[
                  { name: 'Logistics AI', Icon: Navigation, desc: 'Delivery routing & traffic optimizer', status: 'Popular', uses: '15k' },
                  { name: 'Shift AI', Icon: Clock, desc: 'Staff scheduling automation', status: 'New', uses: '8k' },
                  { name: 'Inventory AI', Icon: ShoppingCart, desc: 'Stock level optimization agent', status: 'Popular', uses: '12k' },
                  { name: 'SCM AI', Icon: Link2, desc: 'Supply chain synchronization', status: 'Enterprise', uses: '6k' },
                  { name: 'Cold Chain AI', Icon: Snowflake, desc: 'Temperature anomaly detection', status: 'Featured', uses: '4k' },
                  { name: 'Forecast AI', Icon: TrendingUp, desc: 'Demand prediction analysis', status: 'Popular', uses: '9k' },
                ].map((agent, i) => (
                  <div key={i} style={{
                    background: '#ffffff', borderRadius: 8, padding: '6px', border: '1px solid #f3f4f6', textAlign: 'center', position: 'relative'
                  }}>
                    {agent.status === 'Popular' && <span style={{ position: 'absolute', top: 2, right: 2, fontSize: 3, background: '#fef3c7', color: '#d97706', padding: '1px 3px', borderRadius: 2, fontWeight: 600 }}>HOT</span>}
                    {agent.status === 'New' && <span style={{ position: 'absolute', top: 2, right: 2, fontSize: 3, background: '#dbeafe', color: '#2563eb', padding: '1px 3px', borderRadius: 2, fontWeight: 600 }}>NEW</span>}
                    <div style={{
                      width: 22, height: 22, borderRadius: 6, margin: '0 auto 4px',
                      background: 'linear-gradient(135deg, #581c87 0%, #1e1b4b 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <agent.Icon style={{ width: 11, height: 11, color: '#c4b5fd' }} />
                    </div>
                    <p style={{ fontSize: 5.5, fontWeight: 700, color: textDark, margin: '0 0 2px 0' }}>{agent.name}</p>
                    <p style={{ fontSize: 3.5, color: textMuted, margin: '0 0 3px 0', lineHeight: 1.3, minHeight: 12 }}>{agent.desc}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 4, fontSize: 3.5 }}>
                      <span style={{ color: primaryColor }}>↗ {agent.uses} uses</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OaaSIS Platform Features - 다크 배너 디자인 */}
      <div>
        {/* Header */}
        <h3 style={{ 
          fontSize: 12, 
          fontWeight: 800, 
          color: textDark, 
          margin: '0 0 10px 0', 
          textAlign: 'center',
          letterSpacing: '-0.02em'
        }}>
          Optimization AI Agent Platform
        </h3>

        {/* 3 Feature Cards - 다크 카드 디자인 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '10px' }}>
          {[
            { num: '01', title: 'DECISION-FIRST', desc: 'Decide & act, not just predict', color: '#EAB308' },
            { num: '02', title: 'STRUCTURED INTEL', desc: 'Explicit constraints & control', color: '#10B981' },
            { num: '03', title: 'COMPOSABLE', desc: 'Modular solvers & workflows', color: '#8B5CF6' },
          ].map((item, i) => (
            <div key={i} style={{
              background: '#1e293b',
              borderRadius: 12,
              padding: '12px 10px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Large Background Number */}
              <span style={{ 
                position: 'absolute', 
                top: '50%', 
                right: 6, 
                transform: 'translateY(-50%)',
                fontSize: 32, 
                fontWeight: 900, 
                color: 'rgba(255,255,255,0.08)',
                lineHeight: 1,
              }}>{item.num}</span>
              
              {/* Content */}
              <p style={{ 
                fontSize: 7, 
                fontWeight: 800, 
                color: item.color, 
                margin: '0 0 4px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                position: 'relative',
                zIndex: 1,
              }}>{item.title}</p>
              <p style={{ 
                fontSize: 5.5, 
                color: 'rgba(255,255,255,0.7)', 
                margin: 0, 
                fontWeight: 500,
                position: 'relative',
                zIndex: 1,
                lineHeight: 1.3,
              }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Tagline */}
        <p style={{ 
          fontSize: 7, 
          color: textMuted, 
          textAlign: 'center', 
          margin: 0,
          lineHeight: 1.4
        }}>
          A platform for building <span style={{ color: primaryColor, fontWeight: 700 }}>trustworthy AI agents</span> that optimize <span style={{ color: accentColor, fontWeight: 700 }}>complex real-world decisions</span>.
        </p>
      </div>
    </div>
  );
}

// 중앙 패널 - 시스템적이고 구조적으로 통일된 버티컬 제품 디자인 (커넥터 스타일)
function ProductsPanel({ width, height }: { width: number; height: number }) {
  const primaryColor = '#7c3aed'; // Omelet Purple
  const textDark = '#111827';
  const textMuted = '#6b7280';

  const verticalProducts = [
    { 
      name: 'Fleet Management', 
      Icon: Truck, 
      solver: 'ROUTING SOLVER', 
      iconColor: '#4338ca',
      iconBg: '#eef2ff',
      keywords: [
        { text: 'Truck Dispatch', color: '#eef2ff', textColor: '#4338ca' },
        { text: 'Routing', color: '#e0e7ff', textColor: '#3730a3' }
      ]
    },
    { 
      name: 'Retail', 
      Icon: ShoppingCart, 
      solver: 'INVENTORY SOLVER', 
      iconColor: '#c2410c',
      iconBg: '#fff7ed',
      keywords: [
        { text: 'Demand Forecasting', color: '#fff7ed', textColor: '#c2410c' },
        { text: 'Inventory Control', color: '#ffedd5', textColor: '#9a3412' }
      ]
    },
    { 
      name: 'Packaging', 
      Icon: Boxes, 
      solver: 'PACKING SOLVER', 
      iconColor: '#15803d',
      iconBg: '#f0fdf4',
      keywords: [
        { text: 'Stowage Planning', color: '#f0fdf4', textColor: '#15803d' },
        { text: 'Palletizing', color: '#dcfce7', textColor: '#166534' }
      ]
    },
    { 
      name: 'Hospital', 
      Icon: Building2, 
      solver: 'SCHEDULING SOLVER', 
      iconColor: '#be123c',
      iconBg: '#fff1f2',
      keywords: [
        { text: 'Nurse Scheduling', color: '#fff1f2', textColor: '#be123c' },
        { text: 'Inventory Control', color: '#ffe4e6', textColor: '#9f1239' }
      ]
    },
    { 
      name: 'Manufacturing', 
      Icon: Factory, 
      solver: 'PRODUCTION SOLVER', 
      iconColor: '#6d28d9',
      iconBg: '#f5f3ff',
      keywords: [
        { text: 'Scheduling', color: '#f5f3ff', textColor: '#6d28d9' },
        { text: 'Robot', color: '#ede9fe', textColor: '#5b21b6' }
      ]
    },
    { 
      name: 'Robot', 
      Icon: Bot, 
      solver: 'PLANNING SOLVER', 
      iconColor: '#0e7490',
      iconBg: '#ecfeff',
      keywords: [
        { text: 'Dispatch', color: '#ecfeff', textColor: '#0e7490' },
        { text: 'Pathfinding', color: '#cffafe', textColor: '#155e75' }
      ]
    },
    { 
      name: 'Defense', 
      Icon: Shield, 
      solver: 'TASK SOLVER',
      iconColor: '#be185d',
      iconBg: '#fdf2f8', 
      keywords: [
        { text: 'Task Planning', color: '#fdf2f8', textColor: '#be185d' },
        { text: 'Resource Allocation', color: '#fce7f3', textColor: '#9d174d' }
      ]
    },
  ];

  return (
    <div style={{ width, height, background: '#ffffff', padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
      {/* Header Section - Agent Platform과 통일된 스타일 */}
      <div style={{ marginTop: '8px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div style={{ width: 14, height: 2, background: primaryColor }} />
          <p style={{ 
            fontSize: 11, fontWeight: 700, color: primaryColor, margin: 0,
            letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>DOMAIN EXPERTISE</p>
        </div>
        <h2 style={{ 
          fontSize: 28, fontWeight: 800, color: textDark, margin: '0 0 8px 0',
          letterSpacing: '-0.02em',
        }}>Vertical Solutions</h2>
        <p style={{ fontSize: 10, color: textMuted, margin: 0, lineHeight: 1.5, maxWidth: '90%' }}>
          Tailored MCP Servers integrated with Omelet&apos;s Optimization AI Foundation Model.
        </p>
      </div>

      {/* Products List */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', marginBottom: '20px' }}>
        <div style={{ 
          position: 'absolute', left: 18, top: 20, bottom: 20, width: 1, 
          background: '#e5e7eb',
          zIndex: 0 
        }} />

        {verticalProducts.map((product, i) => (
          <div key={i} style={{
            display: 'flex',
            gap: '16px',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Connector Node - Concept Color */}
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: product.iconBg,
              border: `2px solid ${product.iconColor}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <product.Icon style={{ width: 16, height: 16, color: product.iconColor }} />
            </div>

            {/* Content Card - Monotone Background */}
            <div style={{
              flex: 1,
              padding: '8px 16px',
              borderRadius: 12,
              background: '#f9fafb',
              border: '1px solid #f3f4f6',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: textDark, margin: 0 }}>{product.name}</p>
                <div style={{ 
                  padding: '3px 8px',
                  borderRadius: 6, 
                  background: '#1f2937',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: 6, fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{product.solver}</span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
                {product.keywords.map((keyword, j) => (
                  <span key={j} style={{
                    fontSize: 7, color: keyword.textColor, fontWeight: 600,
                    padding: '3px 6px', borderRadius: 4,
                    background: keyword.color,
                    border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center'
                  }}>{keyword.text}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Resource Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{
          padding: '12px 16px',
          background: '#f9fafb',
          borderRadius: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #f3f4f6'
        }}>
          <div>
            <p style={{ fontSize: 7, fontWeight: 600, color: textMuted, margin: '0 0 4px 0', textTransform: 'uppercase' }}>Omelet Homepage</p>
            <p style={{ fontSize: 14, fontWeight: 800, color: primaryColor, margin: 0 }}>www.omelet.ai</p>
          </div>
          <div style={{
            width: 36, height: 36, background: '#fff', borderRadius: 8, padding: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6'
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://www.omelet.ai"
              alt="Omelet QR"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>

        <div style={{
          padding: '12px 16px',
          background: '#f9fafb',
          borderRadius: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #f3f4f6'
        }}>
          <div>
            <p style={{ fontSize: 7, fontWeight: 600, color: textMuted, margin: '0 0 4px 0', textTransform: 'uppercase' }}>OaaSIS Platform</p>
            <p style={{ fontSize: 14, fontWeight: 800, color: primaryColor, margin: 0 }}>www.oaasis.cc</p>
          </div>
          <div style={{
            width: 36, height: 36, background: '#fff', borderRadius: 8, padding: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6'
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://www.oaasis.cc"
              alt="OaaSIS QR"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InsidePanel({ width, height }: { width: number; height: number }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <div style={{
      width,
      height,
      background: '#0c0e12',
      color: '#ffffff',
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 48px 300px 48px',
    }}>
      {/* Background Gradients */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 60% 40% at 10% 30%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse 60% 50% at 90% 70%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
          linear-gradient(180deg, #030303 0%, #0a0a0a 100%)
        `,
        zIndex: 0,
      }} />

      {/* Header */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '16px', opacity: loaded ? 1 : 0, transition: 'all 0.6s ease-out',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/omelet-wordmark.png" alt="Omelet" style={{ height: '28px', filter: 'brightness(0) invert(1)' }} />
        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>CES 2025</span>
      </div>

      {/* Hero Section */}
      <div style={{
        position: 'relative', zIndex: 1,
        marginBottom: '24px', opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{ fontSize: '96px', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.9, margin: 0 }}>
            Decision <span style={{ 
              background: 'linear-gradient(90deg, #8B5CF6 0%, #10B981 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>OS</span>
          </h1>
          <div style={{ position: 'relative', width: '160px', height: '100px', marginLeft: '16px' }}>
            <div style={{ position: 'absolute', top: '0px', left: '25px', transform: 'rotate(-5deg)' }}><DropletIcon size={56} colorTheme="lemon" faceStyle="surprised-rounded" /></div>
            <div style={{ position: 'absolute', top: '5px', left: '75px', transform: 'rotate(6deg)' }}><DropletIcon size={52} colorTheme="rose" faceStyle="lovely-oval" /></div>
            <div style={{ position: 'absolute', top: '35px', left: '0px', transform: 'rotate(4deg)' }}><DropletIcon size={60} colorTheme="ocean" faceStyle="happy-polygon" /></div>
            <div style={{ position: 'absolute', top: '40px', left: '50px', transform: 'rotate(-3deg)' }}><DropletIcon size={58} colorTheme="grape" faceStyle="cool-rounded" /></div>
            <div style={{ position: 'absolute', top: '38px', left: '100px', transform: 'rotate(8deg)' }}><DropletIcon size={54} colorTheme="sunny" faceStyle="excited-polygon" /></div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '14px' }}>
          <p style={{ fontSize: '19px', color: 'rgba(255,255,255,0.6)', margin: 0, fontWeight: 500 }}>Optimization AI Agent Platform</p>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '19px' }}>—</span>
          <p style={{ fontSize: '19px', background: 'linear-gradient(90deg, #8B5CF6 0%, #10B981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0, fontWeight: 600 }}>OaaSIS</p>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>Optimization as a Service / Infra / System</p>
        </div>
      </div>

      {/* Architecture Diagram */}
      <div style={{
        position: 'relative', zIndex: 1, flex: 1, display: 'flex', alignItems: 'center',
        marginTop: '20px',
        opacity: loaded ? 1 : 0, transform: loaded ? 'scale(1)' : 'scale(0.95)',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.25s',
      }}>
        <svg viewBox="0 0 1000 380" style={{ width: '100%', height: 'auto' }}>
          <defs>
            <filter id="glowPurple"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <linearGradient id="agentCardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#065f46"/>
              <stop offset="50%" stopColor="#064e3b"/>
              <stop offset="100%" stopColor="#022c22"/>
            </linearGradient>
          </defs>

          {/* Labels */}
          <g fontWeight="700" fontSize="14" letterSpacing="0.02em">
            <text x="80" y="12" fill="#A855F7" textAnchor="middle">Optimization AI</text>
            <text x="80" y="28" fill="#A855F7" textAnchor="middle">Foundation Model</text>
            <text x="290" y="12" fill="#A855F7" textAnchor="middle">Problem Class</text>
            <text x="290" y="28" fill="#A855F7" textAnchor="middle">Optimization Solver</text>
            <text x="540" y="12" fill="#10B981" textAnchor="middle">Domain-Specific MCP Server</text>
            <text x="540" y="28" fill="#10B981" textAnchor="middle">(API+Ontology)</text>
            <text x="820" y="12" fill="#10B981" textAnchor="middle">User-Specific</text>
            <text x="820" y="28" fill="#10B981" textAnchor="middle">Agent/SW</text>
          </g>

          {/* Foundation Model */}
          <rect x="30" y="110" width="100" height="160" rx="10" fill="rgba(168, 85, 247, 0.08)" stroke="#A855F7" strokeWidth="2" filter="url(#glowPurple)"/>
          <text x="80" y="178" fill="#A855F7" fontSize="11" fontWeight="600" textAnchor="middle">Optimization AI</text>
          <text x="80" y="195" fill="#A855F7" fontSize="11" fontWeight="600" textAnchor="middle">Foundation</text>
          <text x="80" y="212" fill="#A855F7" fontSize="11" fontWeight="600" textAnchor="middle">Model</text>

          {/* Connection Lines - Exact logic from ces-omelet-main.jsx */}
          {/* Lines to Col6 (970) */}
          <g stroke="#10B981" strokeWidth="0.4" fill="none" opacity="0.12">
            <path d="M 595 70 Q 760 80, 970 100"/>
            <path d="M 595 118 Q 760 135, 970 160"/>
            <path d="M 595 262 Q 760 270, 970 280"/>
            <path d="M 595 310 Q 760 300, 970 280"/>
          </g>
          {/* Lines to Col5 (925) */}
          <g stroke="#10B981" strokeWidth="0.5" fill="none" opacity="0.18">
            <path d="M 595 70 Q 740 78, 925 90"/>
            <path d="M 595 118 Q 740 128, 925 140"/>
            <path d="M 595 190 Q 740 190, 925 190"/>
            <path d="M 595 262 Q 740 252, 925 240"/>
            <path d="M 595 310 Q 740 300, 925 290"/>
          </g>
          {/* Lines to Col4 (875) */}
          <g stroke="#10B981" strokeWidth="0.6" fill="none" opacity="0.25">
            <path d="M 595 70 Q 720 75, 875 80"/>
            <path d="M 595 94 Q 720 112, 875 130"/>
            <path d="M 595 166 Q 720 173, 875 180"/>
            <path d="M 595 214 Q 720 217, 875 220"/>
            <path d="M 595 262 Q 720 266, 875 270"/>
            <path d="M 595 310 Q 720 315, 875 320"/>
          </g>
          {/* Lines to Col3 (820) */}
          <g stroke="#10B981" strokeWidth="0.8" fill="none" opacity="0.32">
            <path d="M 595 70 Q 700 74, 820 78"/>
            <path d="M 595 94 Q 700 108, 820 123"/>
            <path d="M 595 142 Q 700 155, 820 168"/>
            <path d="M 595 214 Q 700 213, 820 213"/>
            <path d="M 595 262 Q 700 260, 820 258"/>
            <path d="M 595 310 Q 700 306, 820 303"/>
          </g>
          {/* Lines to Col2 (755) */}
          <g stroke="#10B981" strokeWidth="1" fill="none" opacity="0.38">
            <path d="M 595 70 Q 670 74, 755 78"/>
            <path d="M 595 94 Q 670 108, 755 123"/>
            <path d="M 595 142 Q 670 155, 755 168"/>
            <path d="M 595 190 Q 670 201, 755 213"/>
            <path d="M 595 238 Q 670 248, 755 258"/>
            <path d="M 595 286 Q 670 294, 755 303"/>
          </g>
          {/* Lines to Col1 (700) */}
          <g stroke="#10B981" strokeWidth="1.2" fill="none" opacity="0.45">
            <path d="M 595 70 Q 640 62, 700 55"/>
            <path d="M 595 94 Q 640 97, 700 100"/>
            <path d="M 595 142 Q 640 143, 700 145"/>
            <path d="M 595 190 Q 640 190, 700 190"/>
            <path d="M 595 238 Q 640 236, 700 235"/>
            <path d="M 595 286 Q 640 283, 700 280"/>
            <path d="M 595 310 Q 640 318, 700 325"/>
          </g>

          {/* FM to Solvers */}
          <g opacity="0.6" stroke="#A855F7" fill="none" strokeWidth="2">
            <path d="M 130 150 Q 170 120, 230 90"/>
            <path d="M 130 175 Q 170 165, 230 157"/>
            <path d="M 130 205 Q 170 215, 230 224"/>
            <path d="M 130 235 Q 170 260, 230 291"/>
          </g>

          {/* Solvers & MCP Servers */}
          {[
            { y: 90, label: 'Routing' }, { y: 157, label: 'Scheduling' }, 
            { y: 224, label: 'Packaging' }, { y: 291, label: 'Inventory' }
          ].map((s, i) => (
            <g key={`sol-${i}`}>
              <rect x="230" y={s.y - 21} width="120" height="42" rx="6" fill="rgba(168, 85, 247, 0.08)" stroke="#A855F7" strokeWidth="1.5"/>
              <text x="290" y={s.y - 1} fill="#A855F7" fontSize="12" fontWeight="600" textAnchor="middle">{s.label}</text>
              <text x="290" y={s.y + 13} fill="rgba(168, 85, 247, 0.6)" fontSize="9" textAnchor="middle">Solver</text>
            </g>
          ))}

          {/* MCP Servers */}
          {[
            'Delivery', 'Cold Chain', 'Fleet', 'Nurse', 'Crew', 'Warehouse', 
            'Box', 'Container', 'Retail', 'Parts', 'Supply'
          ].map((m, i) => {
            const y = 70 + i * 24;
            const solverY = i < 3 ? 90 : i < 6 ? 157 : i < 8 ? 224 : 291;
            return (
              <g key={`mcp-${i}`}>
                <path d={`M 350 ${solverY} Q 420 ${y}, 485 ${y}`} stroke="#A855F7" strokeWidth="1.2" fill="none" opacity="0.45"/>
                <rect x="485" y={y - 11} width="110" height="22" rx="4" fill="rgba(16, 185, 129, 0.08)" stroke="#10B981" strokeWidth="1"/>
                <text x="540" y={y + 4} fill="#10B981" fontSize="8" fontWeight="500" textAnchor="middle">{m} MCP Server</text>
              </g>
            );
          })}

          {/* Column 1 Agents - Full implementation from original */}
          {[55, 100, 145, 190, 235, 280, 325].map((y, i) => (
            <g key={`c1-${i}`} transform={`translate(700, ${y})`}>
              <rect x="-16.5" y="-16.5" width="33" height="33" rx="7" fill="url(#agentCardGradient)" opacity="0.85"/>
              {i === 0 && <path d="M-8 0h16M-4 0l4-6 4 6M0-6v-2M-6 4h12" stroke="#6ee7b7" strokeWidth="1.4" fill="none" opacity="0.95"/>}
              {i === 1 && <g><rect x="-10" y="-3" width="20" height="11" rx="1" stroke="#6ee7b7" strokeWidth="1.2" fill="none" opacity="0.95"/><path d="M-10-3l10-6 10 6M-6 1h5v7h-5zM1 1h5v7h-5z" stroke="#6ee7b7" strokeWidth="1" fill="none" opacity="0.9"/></g>}
              {i === 2 && <g><circle cx="-5" cy="-4" r="3.5" stroke="#6ee7b7" strokeWidth="1.2" fill="none" opacity="0.95"/><circle cx="5" cy="-4" r="3.5" stroke="#6ee7b7" strokeWidth="1.2" fill="none" opacity="0.95"/><path d="M-10 8c0-3 2.2-5 5-5s5 2 5 5M0 8c0-3 2.2-5 5-5s5 2 5 5" stroke="#6ee7b7" strokeWidth="1" fill="none" opacity="0.9"/></g>}
              {i === 3 && <path d="M-10 6l5-4 4 3 6-8M4-3l4 0 0 4" stroke="#6ee7b7" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.95"/>}
              {i === 4 && <path d="M0-8l9 5v10l-9 5-9-5v-10l9-5zM0-8v10M9-3l-9 5M-9-3l9 5" stroke="#6ee7b7" strokeWidth="1.3" fill="none" opacity="0.95"/>}
              {i === 5 && <g><circle cx="0" cy="-6" r="2.8" fill="#6ee7b7" opacity="0.95"/><circle cx="-7" cy="4" r="2.8" fill="#6ee7b7" opacity="0.95"/><circle cx="7" cy="4" r="2.8" fill="#6ee7b7" opacity="0.95"/><path d="M0-3l-6 5.5M0-3l6 5.5M-4.2 4h8.4" stroke="#6ee7b7" strokeWidth="1" opacity="0.8"/></g>}
              {i === 6 && <path d="M-10 8v-10l6 5v-5l6 5v-11h6v16h-18z" stroke="#6ee7b7" strokeWidth="1.2" fill="none" opacity="0.95"/>}
            </g>
          ))}

          {/* Column 2 Agents */}
          {[78, 123, 168, 213, 258, 303].map((y, i) => (
            <g key={`c2-${i}`} transform={`translate(755, ${y})`}>
              <rect x="-13" y="-13" width="26" height="26" rx="5.5" fill="url(#agentCardGradient)" opacity="0.7"/>
              {i === 0 && <path d="M-8 6l5-8 2 4 6-6" stroke="#6ee7b7" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.85"/>}
              {i === 1 && <g><circle cx="0" cy="0" r="7" stroke="#6ee7b7" strokeWidth="1" fill="none" opacity="0.8"/><circle cx="0" cy="0" r="4" stroke="#6ee7b7" strokeWidth="1" fill="none" opacity="0.8"/><circle cx="0" cy="0" r="1.5" fill="#6ee7b7" opacity="0.9"/></g>}
              {i === 2 && <path d="M-6 7v-6M-2 7v-10M2 7v-8M6 7v-12" stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round" opacity="0.85"/>}
              {i === 3 && <g><ellipse cx="0" cy="-4" rx="7" ry="3" stroke="#6ee7b7" strokeWidth="1" fill="none" opacity="0.85"/><path d="M-7-4v8c0 1.6 3.1 3 7 3s7-1.4 7-3v-8" stroke="#6ee7b7" strokeWidth="1" fill="none" opacity="0.8"/><path d="M-7 0c0 1.6 3.1 3 7 3s7-1.4 7-3" stroke="#6ee7b7" strokeWidth="1" fill="none" opacity="0.7"/></g>}
              {i === 4 && <g><circle cx="0" cy="0" r="7" stroke="#6ee7b7" strokeWidth="1" fill="none" opacity="0.85"/><path d="M0-4v4l3 2" stroke="#6ee7b7" strokeWidth="1.2" strokeLinecap="round" opacity="0.9"/></g>}
              {i === 5 && <g><circle cx="0" cy="0" r="7" stroke="#6ee7b7" strokeWidth="1" fill="none" opacity="0.85"/><ellipse cx="0" cy="0" rx="3" ry="7" stroke="#6ee7b7" strokeWidth="0.8" fill="none" opacity="0.7"/><path d="M-7 0h14M-6-4h12M-6 4h12" stroke="#6ee7b7" strokeWidth="0.8" opacity="0.6"/></g>}
            </g>
          ))}

          {/* Column 3 Agents */}
          {[78, 123, 168, 213, 258, 303].map((y, i) => (
            <g key={`c3-${i}`} transform={`translate(820, ${y})`}>
              <rect x="-11" y="-11" width="22" height="22" rx="4.5" fill="url(#agentCardGradient)" opacity="0.55"/>
              {i === 0 && <path d="M-5-3.5l3 3.5-3 3.5M2-3.5l3 3.5-3 3.5" stroke="#6ee7b7" strokeWidth="1" opacity="0.7"/>}
              {i === 1 && <rect x="-5" y="-5" width="10" height="10" rx="1.5" stroke="#6ee7b7" strokeWidth="1" fill="none" opacity="0.7"/>}
              {i === 2 && <g><circle cx="-3" cy="-2" r="2" stroke="#6ee7b7" strokeWidth="0.8" fill="none" opacity="0.7"/><circle cx="3" cy="-2" r="2" stroke="#6ee7b7" strokeWidth="0.8" fill="none" opacity="0.7"/></g>}
              {i === 3 && <path d="M-4 4v-5M0 4v-8M4 4v-6" stroke="#6ee7b7" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>}
              {i === 4 && <g><circle cx="0" cy="-3" r="2" fill="#6ee7b7" opacity="0.65"/><circle cx="-4" cy="3" r="2" fill="#6ee7b7" opacity="0.65"/><circle cx="4" cy="3" r="2" fill="#6ee7b7" opacity="0.65"/></g>}
              {i === 5 && <path d="M-5 0h6v-3h2l2 3h1v3h-11v-3z" stroke="#6ee7b7" strokeWidth="0.8" fill="none" opacity="0.7"/>}
            </g>
          ))}

          {/* Column 4+ Fading Dots */}
          {[80, 130, 180, 220, 270, 320].map((y, i) => (
            <g key={`c4-${i}`} transform={`translate(875, ${y})`} opacity="0.35"><rect x="-9" y="-9" width="18" height="18" rx="3.5" fill="url(#agentCardGradient)"/><circle cx="0" cy="0" r="4" fill="#6ee7b7" opacity="0.8"/></g>
          ))}
          {[90, 140, 190, 240, 290].map((y, i) => (
            <circle key={`c5-${i}`} cx="925" cy={y} r="4" fill="#10B981" opacity="0.25"/>
          ))}
          {[100, 160, 220, 280].map((y, i) => (
            <circle key={`c6-${i}`} cx="970" cy={y} r="4" fill="#10B981" opacity="0.12"/>
          ))}
          
          <text x="990" y="190" fill="rgba(16, 185, 129, 0.35)" fontSize="22" textAnchor="middle">∞</text>
        </svg>
      </div>

      {/* Bottom Footer Section */}
      <div style={{
        position: 'relative', zIndex: 1,
        marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)',
        transform: 'translateY(-40px)',
        opacity: loaded ? 1 : 0, transition: 'all 0.8s ease-out 0.5s',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.05)', borderRadius: '12px', padding: '16px 20px', borderLeft: '3px solid #F59E0B' }}>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#F59E0B', margin: '0 0 6px 0' }}>Your Experts Build. No Code Required.</p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>Domain specialists create production-ready agents — no engineering dependencies.</p>
          </div>
          <div style={{ background: 'rgba(234, 179, 8, 0.05)', borderRadius: '12px', padding: '16px 20px', borderLeft: '3px solid #EAB308' }}>
            <p style={{ fontSize: '14px', fontWeight: 700, color: '#EAB308', margin: '0 0 6px 0' }}>Build Organizational Decision IQ</p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>A self-improving system that turns every decision into institutional knowledge.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrifoldLeafletPage() {
  return <TrifoldLeafletInner />;
}

export default dynamic(() => Promise.resolve(TrifoldLeafletPage), { ssr: false });
