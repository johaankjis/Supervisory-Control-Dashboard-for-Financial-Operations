"""
Risk Metrics Calculation
Calculates various risk metrics including VaR, credit exposure, and operational risk
"""

import random
import math
from datetime import datetime
from typing import Dict, List

class RiskCalculator:
    """Calculate financial risk metrics"""
    
    def __init__(self):
        self.confidence_level = 0.95  # 95% confidence for VaR
        self.positions = self.generate_positions()
        
    def generate_positions(self, count: int = 100) -> List[Dict]:
        """Generate sample portfolio positions"""
        positions = []
        
        for i in range(count):
            position = {
                'position_id': f"POS-{i:04d}",
                'asset_class': random.choice(['equity', 'fixed_income', 'derivative', 'fx']),
                'market_value': random.uniform(100000, 10000000),
                'volatility': random.uniform(0.10, 0.40),  # 10-40% annual volatility
                'beta': random.uniform(0.5, 1.5),
                'credit_rating': random.choice(['AAA', 'AA', 'A', 'BBB', 'BB']),
                'counterparty': f"CP-{random.randint(1000, 9999)}"
            }
            positions.append(position)
        
        return positions
    
    def calculate_var(self) -> Dict:
        """Calculate Value at Risk (VaR)"""
        print("[RISK] Calculating Value at Risk (VaR)...")
        
        total_value = sum(p['market_value'] for p in self.positions)
        
        # Simplified VaR calculation using variance-covariance method
        portfolio_volatility = math.sqrt(
            sum((p['market_value'] * p['volatility']) ** 2 for p in self.positions)
        ) / total_value
        
        # Z-score for 95% confidence
        z_score = 1.645
        
        var_1day = total_value * portfolio_volatility * z_score / math.sqrt(252)  # Daily VaR
        var_10day = var_1day * math.sqrt(10)  # 10-day VaR
        
        result = {
            'portfolio_value': total_value,
            'portfolio_volatility': portfolio_volatility,
            'var_1day': var_1day,
            'var_10day': var_10day,
            'confidence_level': self.confidence_level,
            'calculation_time': datetime.now().isoformat()
        }
        
        print(f"[RISK] Portfolio Value: ${total_value:,.2f}")
        print(f"[RISK] 1-Day VaR (95%): ${var_1day:,.2f}")
        print(f"[RISK] 10-Day VaR (95%): ${var_10day:,.2f}")
        
        return result
    
    def calculate_credit_exposure(self) -> Dict:
        """Calculate credit exposure by counterparty"""
        print("\n[RISK] Calculating Credit Exposure...")
        
        # Group by counterparty
        counterparty_exposure = {}
        
        for position in self.positions:
            cp = position['counterparty']
            if cp not in counterparty_exposure:
                counterparty_exposure[cp] = {
                    'total_exposure': 0,
                    'positions': 0,
                    'credit_rating': position['credit_rating']
                }
            
            counterparty_exposure[cp]['total_exposure'] += position['market_value']
            counterparty_exposure[cp]['positions'] += 1
        
        # Find top exposures
        top_exposures = sorted(
            counterparty_exposure.items(),
            key=lambda x: x[1]['total_exposure'],
            reverse=True
        )[:10]
        
        total_exposure = sum(exp['total_exposure'] for exp in counterparty_exposure.values())
        
        result = {
            'total_credit_exposure': total_exposure,
            'unique_counterparties': len(counterparty_exposure),
            'top_10_exposures': [
                {
                    'counterparty': cp,
                    'exposure': data['total_exposure'],
                    'positions': data['positions'],
                    'credit_rating': data['credit_rating'],
                    'concentration': (data['total_exposure'] / total_exposure) * 100
                }
                for cp, data in top_exposures
            ],
            'calculation_time': datetime.now().isoformat()
        }
        
        print(f"[RISK] Total Credit Exposure: ${total_exposure:,.2f}")
        print(f"[RISK] Unique Counterparties: {len(counterparty_exposure)}")
        
        return result
    
    def calculate_liquidity_risk(self) -> Dict:
        """Calculate liquidity risk metrics"""
        print("\n[RISK] Calculating Liquidity Risk...")
        
        # Categorize positions by liquidity
        highly_liquid = []
        moderately_liquid = []
        illiquid = []
        
        for position in self.positions:
            if position['asset_class'] in ['equity', 'fx']:
                highly_liquid.append(position)
            elif position['asset_class'] == 'fixed_income':
                moderately_liquid.append(position)
            else:
                illiquid.append(position)
        
        total_value = sum(p['market_value'] for p in self.positions)
        
        result = {
            'highly_liquid': {
                'count': len(highly_liquid),
                'value': sum(p['market_value'] for p in highly_liquid),
                'percentage': (sum(p['market_value'] for p in highly_liquid) / total_value) * 100
            },
            'moderately_liquid': {
                'count': len(moderately_liquid),
                'value': sum(p['market_value'] for p in moderately_liquid),
                'percentage': (sum(p['market_value'] for p in moderately_liquid) / total_value) * 100
            },
            'illiquid': {
                'count': len(illiquid),
                'value': sum(p['market_value'] for p in illiquid),
                'percentage': (sum(p['market_value'] for p in illiquid) / total_value) * 100
            },
            'calculation_time': datetime.now().isoformat()
        }
        
        print(f"[RISK] Highly Liquid: {result['highly_liquid']['percentage']:.1f}%")
        print(f"[RISK] Moderately Liquid: {result['moderately_liquid']['percentage']:.1f}%")
        print(f"[RISK] Illiquid: {result['illiquid']['percentage']:.1f}%")
        
        return result

def run_risk_calculations():
    """Execute all risk calculations"""
    print("=" * 60)
    print("RISK METRICS CALCULATION")
    print("=" * 60)
    
    calculator = RiskCalculator()
    
    # Calculate all risk metrics
    var_results = calculator.calculate_var()
    credit_results = calculator.calculate_credit_exposure()
    liquidity_results = calculator.calculate_liquidity_risk()
    
    # Summary
    print("\n" + "=" * 60)
    print("RISK CALCULATION SUMMARY")
    print("=" * 60)
    print(f"Portfolio Positions: {len(calculator.positions)}")
    print(f"Total Portfolio Value: ${var_results['portfolio_value']:,.2f}")
    print(f"10-Day VaR (95%): ${var_results['var_10day']:,.2f}")
    print(f"Credit Exposure: ${credit_results['total_credit_exposure']:,.2f}")
    print(f"Liquidity Profile: {liquidity_results['highly_liquid']['percentage']:.1f}% Highly Liquid")
    
    return {
        'var': var_results,
        'credit': credit_results,
        'liquidity': liquidity_results
    }

if __name__ == "__main__":
    results = run_risk_calculations()
    print("\n[RISK] Risk calculations completed successfully!")
