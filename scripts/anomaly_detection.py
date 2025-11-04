"""
Anomaly Detection System
Uses statistical methods and machine learning to detect anomalies in financial operations
"""

import random
import math
from datetime import datetime, timedelta
from typing import List, Dict, Tuple
import statistics

class AnomalyDetector:
    """Statistical anomaly detection for financial metrics"""
    
    def __init__(self, sensitivity: float = 2.5):
        """
        Initialize detector
        sensitivity: Number of standard deviations for anomaly threshold (default 2.5)
        """
        self.sensitivity = sensitivity
        
    def generate_time_series(self, days: int = 30, base_value: float = 1000000) -> List[Dict]:
        """Generate time series data with some anomalies"""
        data = []
        
        for i in range(days * 24):  # Hourly data
            timestamp = datetime.now() - timedelta(hours=days * 24 - i)
            
            # Normal variation with trend
            trend = base_value * (1 + 0.001 * i)  # Slight upward trend
            noise = random.gauss(0, base_value * 0.05)  # 5% noise
            
            # Inject anomalies (5% chance)
            if random.random() < 0.05:
                anomaly_factor = random.choice([0.5, 0.6, 1.5, 1.8])  # Spike or drop
                value = trend * anomaly_factor + noise
            else:
                value = trend + noise
            
            data.append({
                'timestamp': timestamp,
                'value': max(0, value)  # Ensure non-negative
            })
        
        return data
    
    def detect_statistical_anomalies(self, data: List[Dict], metric_name: str) -> List[Dict]:
        """Detect anomalies using statistical methods (Z-score)"""
        print(f"[ANOMALY] Detecting anomalies in {metric_name}...")
        
        values = [d['value'] for d in data]
        mean = statistics.mean(values)
        stdev = statistics.stdev(values)
        
        anomalies = []
        
        for point in data:
            z_score = abs((point['value'] - mean) / stdev) if stdev > 0 else 0
            
            if z_score > self.sensitivity:
                deviation_pct = ((point['value'] - mean) / mean) * 100
                
                anomaly = {
                    'id': f"anom-{len(anomalies)}",
                    'timestamp': point['timestamp'],
                    'metric_name': metric_name,
                    'expected_value': mean,
                    'actual_value': point['value'],
                    'z_score': z_score,
                    'deviation': abs(deviation_pct),
                    'direction': 'spike' if point['value'] > mean else 'drop',
                    'severity': self._calculate_severity(z_score),
                    'confidence': min(95 + (z_score - self.sensitivity) * 2, 99.9)
                }
                anomalies.append(anomaly)
        
        print(f"[ANOMALY] Found {len(anomalies)} anomalies in {metric_name}")
        return anomalies
    
    def _calculate_severity(self, z_score: float) -> str:
        """Calculate severity based on z-score"""
        if z_score > 4:
            return 'critical'
        elif z_score > 3:
            return 'high'
        elif z_score > 2.5:
            return 'medium'
        else:
            return 'low'
    
    def detect_pattern_anomalies(self, data: List[Dict], window_size: int = 24) -> List[Dict]:
        """Detect anomalies using moving average and pattern analysis"""
        print(f"[ANOMALY] Detecting pattern anomalies with window size {window_size}...")
        
        anomalies = []
        
        for i in range(window_size, len(data)):
            window = data[i-window_size:i]
            window_values = [d['value'] for d in window]
            
            moving_avg = statistics.mean(window_values)
            moving_std = statistics.stdev(window_values)
            
            current_value = data[i]['value']
            
            # Check if current value deviates significantly from moving average
            if moving_std > 0:
                deviation = abs(current_value - moving_avg) / moving_std
                
                if deviation > self.sensitivity:
                    anomaly = {
                        'id': f"pattern-anom-{len(anomalies)}",
                        'timestamp': data[i]['timestamp'],
                        'metric_name': 'Pattern Analysis',
                        'expected_value': moving_avg,
                        'actual_value': current_value,
                        'deviation': ((current_value - moving_avg) / moving_avg) * 100,
                        'severity': self._calculate_severity(deviation),
                        'type': 'pattern_break'
                    }
                    anomalies.append(anomaly)
        
        print(f"[ANOMALY] Found {len(anomalies)} pattern anomalies")
        return anomalies
    
    def detect_rate_anomalies(self, data: List[Dict], threshold: float = 0.3) -> List[Dict]:
        """Detect sudden rate of change anomalies"""
        print(f"[ANOMALY] Detecting rate-of-change anomalies...")
        
        anomalies = []
        
        for i in range(1, len(data)):
            prev_value = data[i-1]['value']
            curr_value = data[i]['value']
            
            if prev_value > 0:
                rate_of_change = abs((curr_value - prev_value) / prev_value)
                
                if rate_of_change > threshold:
                    anomaly = {
                        'id': f"rate-anom-{len(anomalies)}",
                        'timestamp': data[i]['timestamp'],
                        'metric_name': 'Rate of Change',
                        'previous_value': prev_value,
                        'current_value': curr_value,
                        'rate_of_change': rate_of_change * 100,
                        'severity': 'high' if rate_of_change > 0.5 else 'medium',
                        'type': 'sudden_change'
                    }
                    anomalies.append(anomaly)
        
        print(f"[ANOMALY] Found {len(anomalies)} rate-of-change anomalies")
        return anomalies

class MultiMetricDetector:
    """Detect anomalies across multiple financial metrics"""
    
    def __init__(self):
        self.detector = AnomalyDetector(sensitivity=2.5)
        self.metrics = {
            'Trade Volume': 50000000,
            'Reconciliation Rate': 97,
            'Exception Rate': 1.5,
            'Processing Time': 600,
            'System Latency': 150
        }
    
    def run_detection(self) -> Dict:
        """Run anomaly detection on all metrics"""
        print("=" * 60)
        print("MULTI-METRIC ANOMALY DETECTION")
        print("=" * 60)
        
        all_anomalies = []
        
        for metric_name, base_value in self.metrics.items():
            print(f"\n--- Analyzing {metric_name} ---")
            
            # Generate time series data
            data = self.detector.generate_time_series(days=7, base_value=base_value)
            
            # Run statistical detection
            statistical_anomalies = self.detector.detect_statistical_anomalies(data, metric_name)
            all_anomalies.extend(statistical_anomalies)
            
            # Run pattern detection
            pattern_anomalies = self.detector.detect_pattern_anomalies(data, window_size=24)
            all_anomalies.extend(pattern_anomalies)
            
            # Run rate detection
            rate_anomalies = self.detector.detect_rate_anomalies(data, threshold=0.3)
            all_anomalies.extend(rate_anomalies)
        
        # Sort by severity and timestamp
        severity_order = {'critical': 0, 'high': 1, 'medium': 2, 'low': 3}
        all_anomalies.sort(key=lambda x: (
            severity_order.get(x.get('severity', 'low'), 3),
            x['timestamp']
        ), reverse=True)
        
        # Generate summary
        summary = self._generate_summary(all_anomalies)
        
        return {
            'anomalies': all_anomalies[:50],  # Top 50 anomalies
            'summary': summary
        }
    
    def _generate_summary(self, anomalies: List[Dict]) -> Dict:
        """Generate summary statistics"""
        severity_counts = {
            'critical': len([a for a in anomalies if a.get('severity') == 'critical']),
            'high': len([a for a in anomalies if a.get('severity') == 'high']),
            'medium': len([a for a in anomalies if a.get('severity') == 'medium']),
            'low': len([a for a in anomalies if a.get('severity') == 'low'])
        }
        
        return {
            'total_anomalies': len(anomalies),
            'severity_breakdown': severity_counts,
            'detection_time': datetime.now().isoformat(),
            'requires_immediate_action': severity_counts['critical'] + severity_counts['high']
        }

def run_anomaly_detection():
    """Execute anomaly detection system"""
    detector = MultiMetricDetector()
    results = detector.run_detection()
    
    # Display summary
    print("\n" + "=" * 60)
    print("ANOMALY DETECTION SUMMARY")
    print("=" * 60)
    print(f"Total Anomalies Detected: {results['summary']['total_anomalies']}")
    print(f"Critical: {results['summary']['severity_breakdown']['critical']}")
    print(f"High: {results['summary']['severity_breakdown']['high']}")
    print(f"Medium: {results['summary']['severity_breakdown']['medium']}")
    print(f"Low: {results['summary']['severity_breakdown']['low']}")
    print(f"Requires Immediate Action: {results['summary']['requires_immediate_action']}")
    
    # Display top anomalies
    print("\n--- Top 10 Anomalies ---")
    for i, anomaly in enumerate(results['anomalies'][:10], 1):
        print(f"\n{i}. {anomaly.get('metric_name', 'Unknown Metric')}")
        print(f"   Severity: {anomaly.get('severity', 'unknown').upper()}")
        print(f"   Time: {anomaly['timestamp'].strftime('%Y-%m-%d %H:%M:%S')}")
        if 'deviation' in anomaly:
            print(f"   Deviation: {anomaly['deviation']:.2f}%")
    
    return results

if __name__ == "__main__":
    results = run_anomaly_detection()
    print("\n[ANOMALY] Detection completed successfully!")
