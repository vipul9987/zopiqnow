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

export function validatePhone(phone: string): boolean {
  // Accepts numbers with spaces, dashes, parentheses and plus signs
  return /^\+?[0-9\s().-]{8,20}$/.test(phone);
}

export interface RestaurantInput {
  restaurantName: string;
  ownerName: string;
  cityAddress: string;
  phone: string;
  instagram?: string;
  menu?: string;
}

export interface CustomerInput {
  name: string;
  email: string;
  cityAddress: string;
  favoriteCuisine?: string;
}

export function validateCustomer(data: Partial<CustomerInput>) {
  const errors: Record<string, string> = {};

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const cityAddress = (data.cityAddress || "").trim();
  const favoriteCuisine = (data.favoriteCuisine || "").trim();

  if (!name) {
    errors.name = "Name is required";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email format";
  }

  if (!cityAddress) {
    errors.cityAddress = "City Name & Address is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      cityAddress: sanitizeInput(cityAddress),
      favoriteCuisine: sanitizeInput(favoriteCuisine),
    }
  };
}

export function validateRestaurant(data: Partial<RestaurantInput>) {
  const errors: Record<string, string> = {};

  const restaurantName = (data.restaurantName || "").trim();
  const ownerName = (data.ownerName || "").trim();
  const cityAddress = (data.cityAddress || "").trim();
  const phone = (data.phone || "").trim();
  const instagram = (data.instagram || "").trim();
  const menu = (data.menu || "").trim();

  if (!restaurantName) {
    errors.restName = "Restaurant Name is required";
  }

  if (!ownerName) {
    errors.restOwnerName = "Owner / Manager Name is required";
  }

  if (!cityAddress) {
    errors.restCityAddress = "City Name & Address is required";
  }

  if (!phone) {
    errors.restPhone = "Phone Number is required";
  } else if (!validatePhone(phone)) {
    errors.restPhone = "Invalid phone number format";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      restaurantName: sanitizeInput(restaurantName),
      ownerName: sanitizeInput(ownerName),
      cityAddress: sanitizeInput(cityAddress),
      phone: sanitizeInput(phone),
      instagram: sanitizeInput(instagram),
      menu: sanitizeInput(menu),
    }
  };
}
