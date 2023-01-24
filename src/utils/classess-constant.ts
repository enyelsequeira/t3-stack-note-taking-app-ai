export const input = {
  label: "block text-sm font-medium text-gray-700",
  input(error: string | undefined) {
    return `block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
      error && "focus:border-red-500"
    }`;
  },
  error: "text-red-500 text-sm block",
};
