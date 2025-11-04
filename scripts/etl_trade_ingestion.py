"""
ETL Pipeline: Trade Data Ingestion
Simulates extraction, transformation, and loading of trade data from multiple sources
"""

import json
import random
from datetime import datetime, timedelta
from typing import List, Dict, Any

class TradeIngestionPipeline:
    """Simulates trade data ingestion from external sources"""
    
    def __init__(self):
        self.sources = ['Bloomberg', 'Reuters', 'Internal Trading System', 'FIX Gateway']
        self.product_types = ['equities', 'fixed-income', 'derivatives', 'fx']
        
    def extract_trades(self, source: str, count: int = 1000) -> List[Dict[str, Any]]:
        """Extract raw trade data from source"""
        print(f"[ETL] Extracting {count} trades from {source}...")
        
        trades = []
        for i in range(count):
            trade = {
                'trade_id': f"{source[:3].upper()}-{datetime.now().strftime('%Y%m%d')}-{i:06d}",
                'source': source,
                'timestamp': (datetime.now() - timedelta(minutes=random.randint(0, 1440))).isoformat(),
                'product_type': random.choice(self.product_types),
                'quantity': random.randint(100, 100000),
                'price': round(random.uniform(50, 500), 2),
                'counterparty': f"CP-{random.randint(1000, 9999)}",
                'trader_id': f"TRD-{random.randint(100, 999)}",
                'status': random.choice(['pending', 'executed', 'settled']),
                # Simulate data quality issues
                'data_quality_score': random.uniform(0.7, 1.0)
            }
            trades.append(trade)
        
        print(f"[ETL] Extracted {len(trades)} trades from {source}")
        return trades
    
    def transform_trades(self, trades: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Transform and validate trade data"""
        print(f"[ETL] Transforming {len(trades)} trades...")
        
        transformed = []
        errors = 0
        
        for trade in trades:
            # Data validation
            if trade['data_quality_score'] < 0.8:
                errors += 1
                print(f"[ETL] Warning: Low quality data for trade {trade['trade_id']}")
                continue
            
            # Standardize format
            transformed_trade = {
                'id': trade['trade_id'],
                'source_system': trade['source'],
                'execution_time': trade['timestamp'],
                'product': trade['product_type'],
                'volume': trade['quantity'],
                'unit_price': trade['price'],
                'total_value': trade['quantity'] * trade['price'],
                'counterparty_id': trade['counterparty'],
                'trader': trade['trader_id'],
                'settlement_status': trade['status'],
                'processed_at': datetime.now().isoformat()
            }
            transformed.append(transformed_trade)
        
        print(f"[ETL] Transformed {len(transformed)} trades ({errors} errors)")
        return transformed
    
    def load_trades(self, trades: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Load transformed trades into data warehouse"""
        print(f"[ETL] Loading {len(trades)} trades into data warehouse...")
        
        # Simulate loading process
        loaded_count = len(trades)
        failed_count = random.randint(0, int(len(trades) * 0.01))  # 1% failure rate
        
        result = {
            'total_records': len(trades),
            'loaded_successfully': loaded_count - failed_count,
            'failed': failed_count,
            'load_time': datetime.now().isoformat(),
            'status': 'success' if failed_count == 0 else 'partial'
        }
        
        print(f"[ETL] Load complete: {result['loaded_successfully']}/{result['total_records']} records")
        return result

def run_pipeline():
    """Execute the complete ETL pipeline"""
    print("=" * 60)
    print("TRADE INGESTION ETL PIPELINE")
    print("=" * 60)
    
    pipeline = TradeIngestionPipeline()
    
    # Process each source
    all_results = []
    for source in pipeline.sources:
        print(f"\n--- Processing {source} ---")
        
        # Extract
        raw_trades = pipeline.extract_trades(source, count=random.randint(500, 1500))
        
        # Transform
        clean_trades = pipeline.transform_trades(raw_trades)
        
        # Load
        result = pipeline.load_trades(clean_trades)
        all_results.append({
            'source': source,
            'result': result
        })
    
    # Summary
    print("\n" + "=" * 60)
    print("PIPELINE EXECUTION SUMMARY")
    print("=" * 60)
    
    total_processed = sum(r['result']['total_records'] for r in all_results)
    total_loaded = sum(r['result']['loaded_successfully'] for r in all_results)
    total_failed = sum(r['result']['failed'] for r in all_results)
    
    print(f"Total Records Processed: {total_processed}")
    print(f"Successfully Loaded: {total_loaded}")
    print(f"Failed: {total_failed}")
    print(f"Success Rate: {(total_loaded/total_processed)*100:.2f}%")
    print(f"Execution Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    return {
        'summary': {
            'total_processed': total_processed,
            'total_loaded': total_loaded,
            'total_failed': total_failed,
            'success_rate': (total_loaded/total_processed)*100
        },
        'details': all_results
    }

if __name__ == "__main__":
    result = run_pipeline()
    print("\n[ETL] Pipeline execution completed successfully!")
