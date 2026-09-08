import React from 'react';
import {
  Server,
  Database,
  Cpu,
  CheckCircle2,
  XCircle,
  Plus,
  Users,
  Trash2,
  Bell,
  RefreshCw
} from 'lucide-react';
import MealSymbol from '../components/MealSymbol';
import IdTag from '../components/IdTag';

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const todayIdx = (new Date().getDay() + 6) % 7;

const iconByService = {
  userService: Server,
  foodService: Server,
  matchingService: Cpu,
  notificationService: Bell,
  apiGateway: Server,
  redis: Cpu,
  mongodb: Database,
};

function buildWeeklyVolume(donations) {
  const totals = new Array(7).fill(0);
  donations.forEach(d => {
    const idx = typeof d.weekday === 'number' ? d.weekday : todayIdx;
    totals[idx] += Number(d.quantity) || 0;
  });
  return totals;
}

function timeAgo(date) {
  const seconds = Math.max(1, Math.floor((Date.now() - new Date(date).getTime()) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

const eventDot = {
  success: 'bg-emerald-500',
  info: 'bg-blue-500',
  status: 'bg-indigo-500',
  warning: 'bg-amber-500',
};

export default function AdminDashboard({
  donations,
  servicesHealth,
  onToggleService,
  onSimulateNewDonation,
  eventLog = [],
  totalDonationsEver = 0,
  onDeleteDonation,
}) {
  const servicesList = [
    { key: 'userService', name: 'User Service', port: '8001', type: 'FastAPI / Auth' },
    { key: 'foodService', name: 'Food Service', port: '8002', type: 'FastAPI / CRUD' },
    { key: 'matchingService', name: 'Matching Service', port: '8003', type: 'FastAPI / Proximity Engine' },
    { key: 'notificationService', name: 'Notification Service', port: '8004', type: 'FastAPI / Redis Consumer' },
    { key: 'apiGateway', name: 'API Gateway', port: '8000', type: 'Reverse Proxy' },
    { key: 'redis', name: 'Redis Queue', port: '6379', type: 'Event Bus' },
    { key: 'mongodb', name: 'MongoDB', port: '27017', type: 'Persistence Layer' },
  ];

  const healthyCount = Object.values(servicesHealth).filter(Boolean).length;
  const totalServices = Object.keys(servicesHealth).length;
  const uptimePct = Math.round((healthyCount / totalServices) * 100);

  const mealsSaved = donations
    .filter(d => d.status === 'DELIVERED')
    .reduce((sum, d) => sum + (Number(d.quantity) || 0), 0);

  const deliveredCount = donations.filter(d => d.status === 'DELIVERED').length;
  const successRate = donations.length > 0 ? Math.round((deliveredCount / donations.length) * 100) : 0;

  const activeDonors = new Set(donations.map(d => d.donorName).filter(Boolean)).size;

  const weeklyVolume = buildWeeklyVolume(donations);
  const maxVolume = Math.max(1, ...weeklyVolume);

  return (
    <div className="space-y-6">

      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Cloud Observability</span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Admin & System Health</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time status of all containerized microservices and persistence nodes.
          </p>
        </div>
        <button
          onClick={onSimulateNewDonation}
          className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Simulate New Event</span>
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bento-card p-5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Donations</span>
          <p className="text-3xl font-black text-slate-900 mt-2">{totalDonationsEver.toLocaleString()}</p>
          <span className="text-[11px] font-semibold text-emerald-600 mt-1 block">{donations.length} active right now</span>
        </div>
        <div className="bento-card p-5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Meals Saved</span>
          <p className="text-3xl font-black text-blue-600 mt-2">{mealsSaved.toLocaleString()}</p>
          <span className="text-[11px] font-semibold text-blue-700 mt-1 block">From delivered donations</span>
        </div>
        <div className="bento-card p-5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Success Rate</span>
          <p className="text-3xl font-black text-indigo-600 mt-2">{successRate}%</p>
          <span className="text-[11px] font-semibold text-slate-500 mt-1 block">Matched & Delivered</span>
        </div>
        <div className="bento-card p-5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Donors</span>
          <p className="text-3xl font-black text-slate-900 mt-2">{activeDonors}</p>
          <span className="text-[11px] font-semibold text-slate-500 mt-1 flex items-center gap-1"><Users className="w-3 h-3" /> Currently listing food</span>
        </div>
      </div>

      {/* Presentation Demo Banner */}
      <div className="bento-card p-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white border-none shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-200 text-[10px] font-bold uppercase tracking-wider">
              <span>Presentation Money Moment</span>
            </div>
            <h3 className="text-xl font-black">Microservices Fault Tolerance Demo</h3>
            <p className="text-xs text-blue-100 max-w-xl leading-relaxed">
              Stop the <strong>Notification Service</strong> to simulate a container crash. Then post a donation from the Donor Hub. The Food & Matching Services will continue running without interruption, proving independent service resilience!
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleService('notificationService')}
              className={`px-5 py-3 rounded-2xl text-xs font-extrabold transition-all shadow-md active:scale-95 ${
                servicesHealth.notificationService
                  ? 'bg-rose-500 hover:bg-rose-600 text-white'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white'
              }`}
            >
              {servicesHealth.notificationService ? 'Stop Notification Service' : 'Restart Notification Service'}
            </button>
          </div>
        </div>
      </div>

      {/* Microservices Health Table & Live Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* System Health Column */}
        <div className="lg:col-span-2 bento-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-900">System Health</h3>
              <p className="text-xs text-slate-400">Microservice mesh status (Docker & Cloud Run)</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-11 h-11 shrink-0">
                <svg viewBox="0 0 40 40" className="w-11 h-11 -rotate-90">
                  <circle cx="20" cy="20" r="16" fill="none" stroke="#F1F5F9" strokeWidth="6" />
                  <circle
                    cx="20" cy="20" r="16" fill="none"
                    stroke={uptimePct === 100 ? '#10B981' : uptimePct >= 60 ? '#F59E0B' : '#F43F5E'}
                    strokeWidth="6"
                    strokeDasharray={`${(uptimePct / 100) * 100.5} 100.5`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-700">
                  {uptimePct}%
                </span>
              </div>
              <span className={`px-2 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                healthyCount === totalServices ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
              }`}>
                {healthyCount}/{totalServices} Healthy
              </span>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {servicesList.map(srv => {
              const isUp = servicesHealth[srv.key];
              const Icon = iconByService[srv.key] || Server;
              return (
                <div key={srv.key} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`relative w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${
                      isUp ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                      <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white ${
                        isUp ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'
                      }`} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{srv.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">Port {srv.port} • {srv.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      isUp ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {isUp ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {isUp ? 'Healthy' : 'Disconnected'}
                    </span>
                    <button
                      onClick={() => onToggleService(srv.key)}
                      className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition-colors ${
                        isUp
                          ? 'text-rose-600 border-rose-100 hover:bg-rose-50'
                          : 'text-emerald-600 border-emerald-100 hover:bg-emerald-50'
                      }`}
                    >
                      {isUp ? <XCircle className="w-3 h-3" /> : <RefreshCw className="w-3 h-3" />}
                      {isUp ? 'Kill' : 'Recover'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Feed & Real Weekly Chart */}
        <div className="bento-card p-6 flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Donation Volume</h3>
            <p className="text-xs text-slate-400">Weekly rescue trends (meals posted)</p>
            {/* Real chart driven by current donation data */}
            <div className="mt-6 flex items-end justify-between gap-1.5 h-32 pt-4 px-1 border-b border-slate-200">
              {weeklyVolume.map((value, idx) => {
                const heightPct = Math.max(6, Math.round((value / maxVolume) * 100));
                const isToday = idx === todayIdx;
                return (
                  <div key={WEEKDAY_LABELS[idx]} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end justify-center h-24" title={`${value} meals`}>
                      <div
                        className={`w-full max-w-[26px] rounded-t-lg transition-all duration-500 ${
                          isToday ? 'bg-blue-600' : value === 0 ? 'bg-slate-100' : 'bg-blue-300'
                        }`}
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-bold ${isToday ? 'text-blue-700' : 'text-slate-400'}`}>
                      {WEEKDAY_LABELS[idx]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Activity Feed */}
          <div className="space-y-2 pt-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Live Feed</span>
            <div className="space-y-2 text-xs max-h-52 overflow-y-auto pr-1">
              {eventLog.length === 0 && (
                <p className="text-[11px] text-slate-400">No activity yet.</p>
              )}
              {eventLog.slice(0, 6).map(evt => (
                <div key={evt.id} className="flex items-start gap-2 text-slate-600">
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${eventDot[evt.type] || 'bg-slate-400'}`}></span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-slate-400 shrink-0">{timeAgo(evt.time)}</span>
                      <span className="font-semibold text-slate-800 truncate">{evt.title}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-snug">{evt.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Manage Active Donations */}
      <div className="bento-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Manage Active Donations</h3>
            <p className="text-xs text-slate-400">Every listing currently live on the network — remove stale or invalid posts.</p>
          </div>
          <span className="text-xs font-bold text-slate-400">{donations.length} listed</span>
        </div>

        {donations.length === 0 ? (
          <div className="py-8 text-center text-sm font-semibold text-slate-500">
            No donations currently active on the network.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {donations.map(item => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <MealSymbol name={item.name} foodType={item.foodType} size="sm" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 truncate">{item.name}</span>
                      <IdTag id={item.id} />
                    </div>
                    <span className="text-[10px] text-slate-400">{item.donorName} • {item.quantity} meals</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    item.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-700' :
                    item.status === 'CLAIMED' ? 'bg-blue-100 text-blue-700' :
                    item.status === 'PICKUP' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.status}
                  </span>
                  <button
                    onClick={() => onDeleteDonation(item.id)}
                    title="Delete donation"
                    className="flex items-center justify-center w-8 h-8 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
