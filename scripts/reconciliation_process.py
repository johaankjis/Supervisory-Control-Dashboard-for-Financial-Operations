"""
Reconciliation Process
Matches trades between internal systems and external confirmations
"""

import random
from datetime import datetime, timedelta
from typing import List, Dict, Tuple

class ReconciliationEngine:
    """Automated reconciliation engine for trade matching"""
    
    def __init__(self):
        self.tolerance = 0.01  # 1% tolerance for value matching
        
    def generate_internal_records(self, count: int = 1000) -> List[Dict]:
        """Generate internal trade records"""
        print(f"[RECON] Generating {count} internal records...")
        
        records = []
        for i in range(count):
            record = {
                'internal_id': f"INT-{i:06d}",
                'trade_date': (datetime.now() - timedelta(days=random.randint(0, 3))).date().isoformat(),
                'account': f"ACC-{random.randint(10000, 99999)}",
                'amount': round(random.uniform(10000, 1000000), 2),
                'currency': random.choice(['USD', 'EUR', 'GBP', 'JPY']),
                'status': 'pending_reconciliation'
            }
            records.append(record)
        
        return records
    
    def generate_external_confirmations(self, internal_records: List[Dict]) -> List[Dict]:
        """Generate external confirmations (with some mismatches)"""
        print(f"[RECON] Generating external confirmations...")
        
        confirmations = []
        
        for record in internal_records:
            # 95% match rate
            if random.random() < 0.95:
                # Matched record (with possible small discrepancies)
                confirmation = {
                    'external_id': f"EXT-{record['internal_id'].split('-')[1]}",
                    'reference': record['internal_id'],
                    'trade_date': record['trade_date'],
                    'account': record['account'],
                    'amount': record['amount'] * (1 + random.uniform(-0.005, 0.005)),  # Small variance
                    'currency': record['currency'],
                    'received_at': datetime.now().isoformat()
                }
                confirmations.append(confirmation)
            else:
                # Unmatched - either missing or with significant discrepancy
                if random.random() < 0.5:
                    # Missing confirmation
                    pass
                else:
                    # Significant discrepancy
                    confirmation = {
                        'external_id': f"EXT-{record['internal_id'].split('-')[1]}",
                        'reference': record['internal_id'],
                        'trade_date': record['trade_date'],
                        'account': record['account'],
                        'amount': record['amount'] * (1 + random.uniform(0.05, 0.15)),  # Large variance
                        'currency': record['currency'],
                        'received_at': datetime.now().isoformat()
                    }
                    confirmations.append(confirmation)
        
        return confirmations
    
    def match_records(self, internal: List[Dict], external: List[Dict]) -> Tuple[List, List, List]:
        """Match internal records with external confirmations"""
        print(f"[RECON] Matching {len(internal)} internal records with {len(external)} confirmations...")
        
        matched = []
        unmatched = []
        discrepancies = []
        
        # Create lookup for external records
        external_lookup = {conf['reference']: conf for conf in external if 'reference' in conf}
        
        for int_record in internal:
            int_id = int_record['internal_id']
            
            if int_id in external_lookup:
                ext_record = external_lookup[int_id]
                
                # Check if amounts match within tolerance
                amount_diff = abs(int_record['amount'] - ext_record['amount'])
                amount_diff_pct = (amount_diff / int_record['amount']) * 100
                
                if amount_diff_pct <= self.tolerance * 100:
                    # Matched
                    matched.append({
                        'internal_id': int_id,
                        'external_id': ext_record['external_id'],
                        'amount': int_record['amount'],
                        'status': 'matched',
                        'matched_at': datetime.now().isoformat()
                    })
                else:
                    # Discrepancy
                    discrepancies.append({
                        'internal_id': int_id,
                        'external_id': ext_record['external_id'],
                        'internal_amount': int_record['amount'],
                        'external_amount': ext_record['amount'],
                        'difference': amount_diff,
                        'difference_pct': amount_diff_pct,
                        'status': 'discrepancy',
                        'flagged_at': datetime.now().isoformat()
                    })
            else:
                # Unmatched
                unmatched.append({
                    'internal_id': int_id,
                    'amount': int_record['amount'],
                    'status': 'unmatched',
                    'reason': 'no_external_confirmation',
                    'flagged_at': datetime.now().isoformat()
                })
        
        print(f"[RECON] Matched: {len(matched)}, Unmatched: {len(unmatched)}, Discrepancies: {len(discrepancies)}")
        return matched, unmatched, discrepancies
    
    def generate_report(self, matched: List, unmatched: List, discrepancies: List) -> Dict:
        """Generate reconciliation report"""
        total = len(matched) + len(unmatched) + len(discrepancies)
        
        report = {
            'execution_time': datetime.now().isoformat(),
            'total_records': total,
            'matched': len(matched),
            'unmatched': len(unmatched),
            'discrepancies': len(discrepancies),
            'match_rate': (len(matched) / total * 100) if total > 0 else 0,
            'status': 'completed',
            'requires_review': len(unmatched) + len(discrepancies)
        }
        
        return report

def run_reconciliation():
    """Execute reconciliation process"""
    print("=" * 60)
    print("AUTOMATED RECONCILIATION PROCESS")
    print("=" * 60)
    
    engine = ReconciliationEngine()
    
    # Generate data
    print("\n--- Data Generation ---")
    internal_records = engine.generate_internal_records(1000)
    external_confirmations = engine.generate_external_confirmations(internal_records)
    
    # Match records
    print("\n--- Matching Process ---")
    matched, unmatched, discrepancies = engine.match_records(internal_records, external_confirmations)
    
    # Generate report
    print("\n--- Generating Report ---")
    report = engine.generate_report(matched, unmatched, discrepancies)
    
    # Display summary
    print("\n" + "=" * 60)
    print("RECONCILIATION SUMMARY")
    print("=" * 60)
    print(f"Total Records: {report['total_records']}")
    print(f"Matched: {report['matched']} ({report['match_rate']:.2f}%)")
    print(f"Unmatched: {report['unmatched']}")
    print(f"Discrepancies: {report['discrepancies']}")
    print(f"Requires Review: {report['requires_review']}")
    print(f"Status: {report['status'].upper()}")
    
    return report

if __name__ == "__main__":
    result = run_reconciliation()
    print("\n[RECON] Reconciliation process completed!")
