```markdown
# Claude Coding Style Guide

## Core Principles

Write simple, declarative TypeScript code. Prioritize readability over cleverness.

## Style Rules

### Use Declarative Syntax

```typescript
// Good
const adults = users.filter(user => user.age >= 18);
const names = users.map(user => user.name);
const total = prices.reduce((sum, price) => sum + price, 0);

// Avoid
const adults = [];
for (const user of users) {
  if (user.age >= 18) {
    adults.push(user);
  }
}
```

### Avoid Nesting

```typescript
// Good
const isValid = user.age >= 18;
if (!isValid) return null;

const hasPermission = user.role === 'admin';
if (!hasPermission) return null;

return user.profile;

// Avoid
if (user.age >= 18) {
  if (user.role === 'admin') {
    return user.profile;
  }
}
return null;
```

### Keep Functions Short

Each function should do one thing. Aim for 5-10 lines.

```typescript
// Good
const getFullName = (user: User) => `${user.firstName} ${user.lastName}`;
const isAdult = (age: number) => age >= 18;
const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

// Avoid
const processUser = (user: User) => {
  const fullName = `${user.firstName} ${user.lastName}`;
  const isAdult = user.age >= 18;
  const formattedAge = `${user.age} years old`;
  // ... 20 more lines
};
```

### Use Array Methods Over Loops

```typescript
// Good
const activeUserIds = users
  .filter(user => user.isActive)
  .map(user => user.id);

const totalRevenue = orders
  .reduce((sum, order) => sum + order.total, 0);

// Avoid
const activeUserIds = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].isActive) {
    activeUserIds.push(users[i].id);
  }
}
```

### Early Returns

```typescript
// Good
const getDiscount = (user: User) => {
  if (!user.isPremium) return 0;
  if (user.level < 5) return 0.1;
  return 0.2;
};

// Avoid
const getDiscount = (user: User) => {
  let discount = 0;
  if (user.isPremium) {
    if (user.level >= 5) {
      discount = 0.2;
    } else {
      discount = 0.1;
    }
  }
  return discount;
};
```

## Examples

### Data Transformation

```typescript
const processOrders = (orders: Order[]) => {
  const validOrders = orders.filter(order => order.total > 0);
  const withTax = validOrders.map(order => ({
    ...order,
    total: order.total * 1.1
  }));
  return withTax;
};
```

### Conditional Logic

```typescript
const canCheckout = (cart: Cart, user: User) => {
  const hasItems = cart.items.length > 0;
  const hasAddress = Boolean(user.shippingAddress);
  const hasPayment = Boolean(user.paymentMethod);

  return hasItems && hasAddress && hasPayment;
};
```

### Aggregation

```typescript
const summarizeCart = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { subtotal, itemCount };
};
```

## Summary

- Write declarative code
- Avoid nesting, use early returns
- No for/while loops, use map/filter/reduce
- Keep functions short and focused
- Use TypeScript for type safety
```
