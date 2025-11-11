# Supervisory Control Dashboard for Financial Operations

A comprehensive real-time monitoring and control dashboard designed for financial operations teams to oversee trade processing, reconciliation, risk management, and anomaly detection across multiple product types.

## 🎯 Overview

This supervisory control dashboard provides financial operations managers and supervisors with real-time visibility into critical business metrics, enabling proactive monitoring and rapid response to operational issues. Built with modern web technologies, it offers a sophisticated yet intuitive interface for managing complex financial workflows.

## ✨ Key Features

### 📊 Real-Time Monitoring
- **Live KPI Dashboard**: Track key performance indicators including trade volume, reconciliation rates, exception rates, processing times, and system health
- **Auto-refresh**: Automatic data updates every 30 seconds to ensure current information
- **Multi-product Support**: Monitor equities, fixed-income, derivatives, and FX trades

### 🚨 Intelligent Alerting
- **Anomaly Detection**: Machine learning-powered detection of unusual patterns and deviations
- **Severity Classification**: Categorized alerts (low, medium, high, critical) for prioritized response
- **Critical Alert Banners**: Prominent display of urgent issues requiring immediate attention

### 📈 Analytics & Visualization
- **Trade Volume Charts**: Product-wise breakdown of trading activity
- **Reconciliation Trends**: 7-day trend analysis of matching and reconciliation performance
- **Exception Breakdown**: Categorized view of exceptions by type (settlement failures, pricing errors, data quality issues, compliance, operational)

### 🔍 Anomaly Management
- **Dedicated Anomaly Dashboard**: Comprehensive view of all detected anomalies
- **Timeline Visualization**: Historical view of anomaly patterns
- **Confidence Scoring**: Statistical confidence levels for each detected anomaly
- **Expected vs Actual Analysis**: Clear deviation metrics for quick diagnosis

### 🔄 Pipeline Management
- **ETL Pipeline Control**: Monitor and trigger data ingestion pipelines
- **Reconciliation Process**: Manual initiation and monitoring of reconciliation workflows
- **Risk Calculation**: On-demand risk metrics computation

### 📋 Executive Reporting
- **Automated Report Generation**: Executive summaries with key metrics and insights
- **Export Capabilities**: Download reports in JSON or CSV format
- **Actionable Insights**: AI-generated recommendations based on current data patterns
- **Historical Comparisons**: Period-over-period performance analysis

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Next.js 16.0.0](https://nextjs.org/) (React 19.2.0)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.9 with custom animations
- **UI Components**: Radix UI primitives for accessible components
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation

### Development Tools
- **Package Manager**: pnpm
- **Build Tool**: Next.js built-in bundler
- **Linting**: ESLint
- **Type Checking**: TypeScript strict mode

### Key Libraries
- `date-fns`: Date manipulation and formatting
- `clsx` & `tailwind-merge`: Conditional styling utilities
- `next-themes`: Dark/light mode theming support
- `sonner`: Toast notifications
- `cmdk`: Command palette functionality

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher
- **pnpm**: Version 8.x or higher (recommended) or npm/yarn
- **Git**: For version control

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/Supervisory-Control-Dashboard-for-Financial-Operations.git
   cd Supervisory-Control-Dashboard-for-Financial-Operations
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the dashboard

## 📜 Available Scripts

- **`pnpm dev`** - Start the development server with hot-reloading
- **`pnpm build`** - Build the production-optimized application
- **`pnpm start`** - Start the production server (requires build first)
- **`pnpm lint`** - Run ESLint to check code quality

## 📁 Project Structure

```
├── app/                          # Next.js App Router pages
│   ├── anomalies/               # Anomaly detection page
│   ├── pipelines/               # Pipeline management page
│   ├── reports/                 # Executive reports page
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Main dashboard page
│   └── globals.css              # Global styles
│
├── components/                   # React components
│   ├── ui/                      # Base UI components (buttons, cards, etc.)
│   ├── alert-banner.tsx         # Critical alert display
│   ├── anomaly-card.tsx         # Anomaly detail card
│   ├── anomaly-timeline.tsx     # Timeline visualization
│   ├── dashboard-header.tsx     # Main header component
│   ├── exception-breakdown.tsx  # Exception analysis chart
│   ├── executive-summary-card.tsx # Report summary display
│   ├── insights-panel.tsx       # AI insights component
│   ├── kpi-card.tsx             # KPI metric card
│   ├── navigation.tsx           # Main navigation menu
│   ├── reconciliation-trend-chart.tsx # Reconciliation visualization
│   ├── theme-provider.tsx       # Theme context provider
│   └── trade-volume-chart.tsx   # Trade volume visualization
│
├── lib/                         # Utility functions and core logic
│   ├── analytics.ts             # Analytics calculations
│   ├── mock-data.ts             # Mock data generator
│   ├── report-generator.ts      # Report generation logic
│   ├── types.ts                 # TypeScript type definitions
│   └── utils.ts                 # Helper utilities
│
├── hooks/                       # Custom React hooks
├── public/                      # Static assets
├── scripts/                     # Build and utility scripts
├── styles/                      # Additional stylesheets
│
├── components.json              # shadcn/ui configuration
├── next.config.mjs              # Next.js configuration
├── package.json                 # Dependencies and scripts
├── pnpm-lock.yaml              # Dependency lock file
├── postcss.config.mjs          # PostCSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🔑 Key Functionality

### Dashboard Overview (`/`)
The main dashboard provides at-a-glance visibility into:
- 6 critical KPI cards with trend indicators
- Trade volume breakdown by product type
- 7-day reconciliation trend analysis
- Exception category breakdown
- Real-time critical alerts

### Anomaly Detection (`/anomalies`)
Advanced anomaly detection features:
- Statistical deviation analysis
- Confidence scoring for each detection
- Severity-based filtering
- Timeline view of historical anomalies
- Expected vs actual value comparisons

### Pipeline Management (`/pipelines`)
Control and monitor data pipelines:
- Trade data ingestion ETL
- Reconciliation process execution
- Risk metrics calculation
- Pipeline status tracking
- Manual trigger capability

### Executive Reports (`/reports`)
Comprehensive reporting tools:
- Automated executive summaries
- Key metrics aggregation
- AI-generated insights
- Export to JSON/CSV
- Period comparison analysis

## 📊 Data Model

The application uses several core data types:

- **TradeVolume**: Trading activity by product type
- **ReconciliationRecord**: Account reconciliation status
- **Exception**: Operational exceptions and issues
- **ProcessingMetric**: System performance metrics
- **RiskMetric**: Risk exposure measurements
- **AnomalyDetection**: Detected unusual patterns

## 🎨 UI/UX Features

- **Responsive Design**: Fully responsive layout supporting desktop, tablet, and mobile
- **Dark/Light Mode**: System-aware theme switching
- **Accessible Components**: WCAG-compliant UI components
- **Loading States**: Skeleton loaders and loading indicators
- **Toast Notifications**: Non-intrusive user feedback
- **Keyboard Navigation**: Full keyboard accessibility

## 🔄 Data Flow

1. **Data Ingestion**: Mock data simulates real-time financial operations
2. **Analytics Engine**: Processes raw data into KPIs and metrics
3. **Anomaly Detection**: Statistical analysis identifies unusual patterns
4. **Visualization**: Charts and cards display processed information
5. **Auto-refresh**: Periodic updates maintain current state

## 🧪 Development Notes

- The application currently uses mock data for demonstration purposes
- Production deployment would integrate with real financial data sources
- Build configuration ignores TypeScript errors for development flexibility
- Images are unoptimized for easier static deployment

## 🚧 Future Enhancements

Potential areas for expansion:
- Real-time data integration with trading systems
- User authentication and role-based access control
- Historical data analysis and trending
- Advanced ML models for anomaly detection
- Webhook integrations for alert notifications
- Multi-tenancy support
- Audit trail and compliance logging
- Custom dashboard widgets and layouts

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

## 📝 License

This project is part of a demonstration/portfolio and is available for reference and learning purposes.

## 👤 Author

**johaankjis**
- GitHub: [@johaankjis](https://github.com/johaankjis)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [React](https://react.dev/)
- UI components powered by [Radix UI](https://www.radix-ui.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Charts by [Recharts](https://recharts.org/)

---

**Note**: This dashboard is designed for financial operations monitoring. In a production environment, ensure proper security measures, data encryption, access controls, and compliance with relevant financial regulations are implemented.
