export class Util {
  toCamelCase<T>(obj: Record<string, any>): T {
    if (obj !== null && typeof obj === "object") {
      if (Array.isArray(obj)) {
        return obj.map((item) => this.toCamelCase(item)) as T;
      } else {
        const newObj: Record<string, any> = {};

        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const newKey = key.replace(/_([a-z])/g, (match, letter) =>
              letter.toUpperCase()
            );

            newObj[newKey] = this.toCamelCase(obj[key]);
          }
        }

        return newObj as T;
      }
    } else {
      return obj;
    }
  }

  toSnakeCase<T>(obj: Record<string, any>): T {
    if (obj !== null && typeof obj === "object") {
      if (Array.isArray(obj)) {
        return obj.map((item) => this.toSnakeCase(item)) as T;
      } else {
        const newObj: Record<string, any> = {};

        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const newKey = key.replace(
              /[A-Z]/g,
              (match) => `_${match.toLowerCase()}`
            );

            newObj[newKey] = this.toSnakeCase(obj[key]);
          }
        }

        return newObj as T;
      }
    } else {
      return obj;
    }
  }
}
