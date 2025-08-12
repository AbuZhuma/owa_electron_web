export const isArrayOfObjects = (value: any): boolean => {
      return (
            Array.isArray(value) &&
            value.length > 0 &&
            typeof value[0] === "object" &&
            value[0] !== null &&
            !Array.isArray(value[0])
      )
}