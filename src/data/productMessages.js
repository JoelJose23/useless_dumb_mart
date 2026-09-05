export const PRODUCT_MESSAGES = {
  1: "Kutta, Madhav-ettan’s son is breathing for free and building a career. You are about to pay ₹499 for air.",
  2: "Madhav-ettan’s son bought actual furniture for his house. You are spending ₹1,299 on a chair nobody can even see. Kutta, please think.",
  3: "Kutta, Madhav-ettan’s son is solving quantum problems. You are paying ₹2,499 for a rock that disappears when you look at it.",
  4: "₹9,999 for absolutely nothing? Madhav-ettan’s son got an internship. You got this. Kutta.",
  5: "Madhav-ettan’s son knows how electricity works. You just paid ₹2,999 for a cable designed to destroy your battery. Kutta.",
  6: "One shoe and one sock for ₹5,499. Madhav-ettan’s son somehow managed to buy a complete pair. Kutta, this is getting embarrassing.",
  7: "Madhav-ettan’s son is balancing his career. You are wearing a ₹3,999 band to balance imaginary energy. Kutta.",
  8: "Kutta, what emergency requires a ₹899 spoon? Madhav-ettan’s son is preparing for his future. You are preparing for soup.",
  9: "A bell that makes no sound. Even your purchase makes more noise than your achievements. Madhav-ettan’s son would never.",
  10: "₹12,999 for a ladder that is 17 centimetres tall. Madhav-ettan’s son is climbing the corporate ladder. You bought this.",
  11: "₹1,499 for ONE ice cube. Madhav-ettan’s son is investing money. You are freezing yours.",
  12: "₹14,999 for one key. Madhav-ettan’s son can type an entire resume. You can press one button. Kutta.",
  13: "₹1,499 for a bucket that holds nothing. Madhav-ettan’s son has a full bank account. You have an empty bucket.",
  14: "Kutta, your chair already has a chair. Madhav-ettan’s son has a job. Somehow you are the one who needs more seating.",
  15: "₹2,999 for one grain of rice. Madhav-ettan’s son probably ate an entire meal before starting work. Kutta, reconsider.",
  16: "You paid ₹699 for a coconut shell with no coconut. Madhav-ettan’s son opened an actual coconut. This is not a competition you are winning.",
};

export const PRODUCT_MESSAGES_BY_NAME = {
  "Premium Air™": "Kutta, Madhav-ettan’s son is breathing for free and building a career. You are about to pay ₹499 for air.",
  "Invisible Chair™": "Madhav-ettan’s son bought actual furniture for his house. You are spending ₹1,299 on a chair nobody can even see. Kutta, please think.",
  "Quantum Rock™": "Kutta, Madhav-ettan’s son is solving quantum problems. You are paying ₹2,499 for a rock that disappears when you look at it.",
  "Premium Nothing™": "₹9,999 for absolutely nothing? Madhav-ettan’s son got an internship. You got this. Kutta.",
  "ReverseCharge USB™": "Madhav-ettan’s son knows how electricity works. You just paid ₹2,999 for a cable designed to destroy your battery. Kutta.",
  "Footwear Starter Pack™": "One shoe and one sock for ₹5,499. Madhav-ettan’s son somehow managed to buy a complete pair. Kutta, this is getting embarrassing.",
  "Energy Band™": "Madhav-ettan’s son is balancing his career. You are wearing a ₹3,999 band to balance imaginary energy. Kutta.",
  "Emergency Spoon™": "Kutta, what emergency requires a ₹899 spoon? Madhav-ettan’s son is preparing for his future. You are preparing for soup.",
  "Soundproof Bell™": "A bell that makes no sound. Even your purchase makes more noise than your achievements. Madhav-ettan’s son would never.",
  "Portable Ladder™": "₹12,999 for a ladder that is 17 centimetres tall. Madhav-ettan’s son is climbing the corporate ladder. You bought this.",
  "Luxury Ice Cube™": "₹1,499 for ONE ice cube. Madhav-ettan’s son is investing money. You are freezing yours.",
  "One-Key Mechanical Keyboard™": "₹14,999 for one key. Madhav-ettan’s son can type an entire resume. You can press one button. Kutta.",
  "The Empty Bucket™": "₹1,499 for a bucket that holds nothing. Madhav-ettan’s son has a full bank account. You have an empty bucket.",
  "Chair for Your Chair™": "Kutta, your chair already has a chair. Madhav-ettan’s son has a job. Somehow you are the one who needs more seating.",
  "One Grain of Rice™": "₹2,999 for one grain of rice. Madhav-ettan’s son probably ate an entire meal before starting work. Kutta, reconsider.",
  "Coconut With No Coconut™": "You paid ₹699 for a coconut shell with no coconut. Madhav-ettan’s son opened an actual coconut. This is not a competition you are winning.",
};

export function getProductMessage(product) {
  if (!product) return "";
  if (product.id != null && PRODUCT_MESSAGES[product.id]) {
    return PRODUCT_MESSAGES[product.id];
  }
  if (product.name && PRODUCT_MESSAGES_BY_NAME[product.name]) {
    return PRODUCT_MESSAGES_BY_NAME[product.name];
  }
  return "";
}
