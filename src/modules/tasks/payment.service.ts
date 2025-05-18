export class PaymentService {
  async calculateFee(
    amount: number,
    userType: 'regular' | 'vip',
  ): Promise<number> {
    const baseFee = 0.02; // 2%
    const vipDiscount = 0.005;

    if (amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }

    let fee = amount * baseFee;

    if (userType === 'vip') {
      fee -= amount * vipDiscount;
    }

    // Round to 2 decimal places
    return Math.round(fee * 100) / 100;
  }
}
