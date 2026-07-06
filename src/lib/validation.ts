export function sanitizeInput(str: string): string {
  if (!str) return "";
  return str.trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  return /^\+?[0-9\s-]{8,15}$/.test(phone);
}

export interface CustomerInput {
  name: string;
  email: string;
  phone: string;
  city: string;
  notify?: boolean;
}

export interface RestaurantInput {
  restaurantName: string;
  ownerName: string;
  email: string;
  phone: string;
  city: string;
  cuisineType: string;
  averageDailyOrders: string;
  website?: string;
  message?: string;
}

export function validateCustomer(data: Partial<CustomerInput>) {
  const errors: Record<string, string> = {};

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const phone = (data.phone || "").trim();
  const city = (data.city || "").trim();

  if (!name) errors.custName = "Name is required";
  if (!email) {
    errors.custEmail = "Email is required";
  } else if (!validateEmail(email)) {
    errors.custEmail = "Invalid email format";
  }

  if (!phone) {
    errors.custPhone = "Phone number is required";
  } else if (!validatePhone(phone)) {
    errors.custPhone = "Invalid phone number";
  }

  if (!city) errors.custCity = "Preferred launch city is required";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      city: sanitizeInput(city),
      notify: !!data.notify
    }
  };
}

export function validateRestaurant(data: Partial<RestaurantInput>) {
  const errors: Record<string, string> = {};

  const restaurantName = (data.restaurantName || "").trim();
  const ownerName = (data.ownerName || "").trim();
  const email = (data.email || "").trim();
  const phone = (data.phone || "").trim();
  const city = (data.city || "").trim();
  const cuisineType = (data.cuisineType || "").trim();
  const averageDailyOrders = (data.averageDailyOrders || "").trim();
  const website = (data.website || "").trim();
  const message = (data.message || "").trim();

  if (!restaurantName) errors.restName = "Restaurant name is required";
  if (!ownerName) errors.restOwner = "Owner/manager name is required";
  
  if (!email) {
    errors.restEmail = "Email is required";
  } else if (!validateEmail(email)) {
    errors.restEmail = "Invalid email format";
  }

  if (!phone) {
    errors.restPhone = "Phone number is required";
  } else if (!validatePhone(phone)) {
    errors.restPhone = "Invalid phone number";
  }

  if (!cuisineType) errors.restCuisine = "Cuisine type is required";
  if (!city) errors.restCity = "Restaurant city is required";

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      restaurantName: sanitizeInput(restaurantName),
      ownerName: sanitizeInput(ownerName),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      city: sanitizeInput(city),
      cuisineType: sanitizeInput(cuisineType),
      averageDailyOrders: sanitizeInput(averageDailyOrders),
      website: sanitizeInput(website),
      message: sanitizeInput(message)
    }
  };
}
