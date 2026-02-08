import { Brain, TrendingUp, Users, Clock } from 'lucide-react';

interface AIInsightsProps {
  expanded?: boolean;
}

export function AIInsights({ expanded = false }: AIInsightsProps) {
  const insights = [
    {
      icon: TrendingUp,
      title: 'Crowd Flow Prediction',
      description: 'Main Stage will reach 90% capacity in 15 minutes',
      confidence: 92,
      action: 'Recommend opening alternate routes',
    },
    {
      icon: Users,
      title: 'Density Analysis',
      description: 'Food Court showing unusual congestion patterns',
      confidence: 87,
      action: 'Deploy additional staff',
    },
    {
      icon: Clock,
      title: 'Timeline Forecast',
      description: 'Peak attendance expected at 9:30 PM',
      confidence: 94,
      action: 'Prepare crowd management protocols',
    },
  ];

  if (!expanded) {
    return (
      <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-bold text-white">AI Insights</h2>
        </div>

        <div className="space-y-3">
          {insights.slice(0, 2).map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-sm mb-1">{insight.title}</h3>
                    <p className="text-white/60 text-xs mb-2">{insight.description}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-white/10 rounded-full h-1 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                          style={{ width: `${insight.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs text-white/70">{insight.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">AI-Powered Insights</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-bold">{insight.title}</h3>
              </div>
              <p className="text-white/70 text-sm mb-4">{insight.description}</p>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-white/60">AI Confidence</span>
                  <span className="text-xs text-white font-medium">{insight.confidence}%</span>
                </div>
                <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all"
                    style={{ width: `${insight.confidence}%` }}
                  />
                </div>
              </div>
              <div className="p-3 bg-black/30 rounded-lg">
                <p className="text-xs text-green-400 font-medium">✓ {insight.action}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6">
        <h3 className="text-white font-bold mb-3">Machine Learning Model Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-white/60 text-xs mb-1">Prediction Accuracy</p>
            <p className="text-white text-2xl font-bold">96.4%</p>
          </div>
          <div>
            <p className="text-white/60 text-xs mb-1">Data Points Analyzed</p>
            <p className="text-white text-2xl font-bold">1.2M</p>
          </div>
          <div>
            <p className="text-white/60 text-xs mb-1">Response Time</p>
            <p className="text-white text-2xl font-bold">45ms</p>
          </div>
          <div>
            <p className="text-white/60 text-xs mb-1">Alerts Prevented</p>
            <p className="text-white text-2xl font-bold">28</p>
          </div>
        </div>
      </div>
    </div>
  );
}
