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
  cityAddress: string;
  phone: string;
  instagram?: string;
  menu?: string;
}

export function validateRestaurant(data: Partial<RestaurantInput>) {
  const errors: Record<string, string> = {};

  const restaurantName = (data.restaurantName || "").trim();
  const cityAddress = (data.cityAddress || "").trim();
  const phone = (data.phone || "").trim();
  const instagram = (data.instagram || "").trim();
  const menu = (data.menu || "").trim();

  if (!restaurantName) {
    errors.restName = "Restaurant Name is required";
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
      cityAddress: sanitizeInput(cityAddress),
      phone: sanitizeInput(phone),
      instagram: sanitizeInput(instagram),
      menu: sanitizeInput(menu),
    }
  };
}
