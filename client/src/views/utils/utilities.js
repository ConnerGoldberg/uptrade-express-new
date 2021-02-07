/** A place for random useful utilities */
import React from "react";

const NUTRIENT_MULTIPLIERS = {
  FAT: 9,
  PROTEIN: 4,
  CARBS: 4,
};

const DAILY_MEALS = [
  "Coffee",
  "Breakfast",
  "Snack1",
  "Lunch",
  "Snack2",
  "Dinner",
  "Dessert",
];

const NUTRIENTS = ["calories", "protein", "fat", "carbohydrates", "fiber"];

const NUTRIENT_TOLERANCES = {
  calories: { tolerance: { min: 40, max: 40 }, unit: "cal" },
  protein: { tolerance: { min: 20, max: 20 }, unit: "g" },
  fat: { tolerance: { min: 10, max: 10 }, unit: "%" },
  fiber: { tolerance: { min: 5, max: 25 }, floor: 15, unit: "g" },
};

/**
 * nl2br
 * Replaces newlines in text with a BR tag
 * thanks to: https://codesandbox.io/s/94k7k80jxy
 */
const nl2br = (text) => {
  return text
    ? text.split(/\r\n|\r|\n/).reduce((res, frag, i, arr) => {
        // Because React even cares that newlines have unique keys ¯\_(ツ)_/¯
        const br = React.createElement("br", { key: `line-break-${i}` });
        return [...res, frag, i < arr.length - 1 ? [br] : ""];
      }, [])
    : text;
};

const roundToNearestInt = (amount, roundTo) => {
  roundTo = parseInt(roundTo, 10); // guarantee integer
  if (roundTo === 0 || isNaN(parseInt(amount, 10))) {
    return 0; // guard against division by zero or undefined amount
  }
  let value = parseInt(amount / roundTo, 10) * roundTo; // round down to nearest multiple of roundTo
  if (amount % roundTo >= roundTo / 2) {
    // if modulo greater than half then
    value += roundTo; // add the roundto
  }
  return value;
};

const setNutrientPercentages = (nutrients) => {
  const { calories, protein, fat, fiber } = nutrients;
  const carbohydrates = nutrients.carbs || nutrients.carbohydrates;
  const processed = { calories, protein, fat, fiber, carbohydrates };
  processed.proteinPercent = calcNutrientPercentage(
    calories,
    protein,
    NUTRIENT_MULTIPLIERS.PROTEIN
  );
  processed.carbohydratesPercent = calcNutrientPercentage(
    calories,
    carbohydrates,
    NUTRIENT_MULTIPLIERS.CARBS
  );
  processed.fatPercent = calcNutrientPercentage(
    calories,
    fat,
    NUTRIENT_MULTIPLIERS.FAT
  );
  return processed;
};

const calculateTolerances = (nutrients, goalNutrients) => {
  const { ...processedNutrients } = nutrients;

  Object.keys(NUTRIENT_TOLERANCES).forEach((key) => {
    const { tolerance, unit, floor } = NUTRIENT_TOLERANCES[key];
    const min =
      goalNutrients[key] -
      (unit === "%"
        ? calcPercentageVariance(goalNutrients[key], tolerance.min)
        : tolerance.min);
    const max =
      goalNutrients[key] +
      (unit === "%"
        ? calcPercentageVariance(goalNutrients[key], tolerance.max)
        : tolerance.max);
    const variance = {
      amount: processedNutrients[key] - goalNutrients[key],
    };

    const toleranceKey = `${key}Variation`;
    const isWithinTolerance =
      processedNutrients[key] >= min && processedNutrients[key] <= max;
    processedNutrients[toleranceKey] = {
      key,
      tolerance,
      floor,
      unit,
      isWithinTolerance,
      variance,
      min,
      max,
      goal: goalNutrients[key],
    };

    // should be false if there is no floor defined for the nutrient
    processedNutrients[toleranceKey].minimumReached =
      processedNutrients[key] >= floor || false;
  });
  return processedNutrients;
};

const calcNutrientPercentage = (denominator, nutrient, multiplier) => {
  return (nutrient * multiplier * 100) / denominator;
};

const calcPercentageDifference = (numerator, denominator) => {
  return (numerator / denominator) * 100 - 100;
};

const calcPercentageVariance = (predicate, percentage) => {
  return (predicate * percentage) / 100;
};

const parseFloatNumberForDisplay = (number) => {
  return number && Math.round(number);
};

const upperCaseFirstLetter = (string = "") => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const sortObjectListByAccessor = (objectList, accessor) => {
  return objectList.sort((a, b) => {
    const varA = a[accessor].toLowerCase
      ? a[accessor].toLowerCase()
      : a[accessor];
    const varB = b[accessor].toLowerCase
      ? b[accessor].toLowerCase()
      : b[accessor];

    if (varA < varB) return -1;
    if (varA > varB) return 1;
    return 0;
  });
};

const dedupeObjectArray = (objectList, accessor) => {
  const deduped = [];
  objectList.forEach((item) => {
    if (!deduped.find((predicate) => predicate[accessor] === item[accessor])) {
      deduped.push(item);
    }
  });
  return deduped;
};

const joinObjectArrayByAccessor = (objectList, accessor, joiner) => {
  joiner = joiner || ", ";
  return objectList.length > 0
    ? objectList.map((item) => item[accessor]).join(joiner)
    : "None";
};

// a little function to help us with reordering the result
const reorderArrayObjects = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const cloneObjectArray = (objArray) => {
  return objArray.map((item) => item);
};

const isEmptyObject = (obj) => {
  return typeof obj === "object" && Object.keys(obj).length === 0;
};

const findObjectInArray = (predicate, objArray, accessor) => {
  return objArray && objArray.find((item) => item[accessor] === predicate);
};

export default {
  NUTRIENT_MULTIPLIERS,
  NUTRIENTS,
  DAILY_MEALS,
  NUTRIENT_TOLERANCES,
  nl2br,
  roundToNearestInt,
  setNutrientPercentages,
  calcNutrientPercentage,
  calcPercentageDifference,
  calculateTolerances,
  parseFloatNumberForDisplay,
  upperCaseFirstLetter,
  sortObjectListByAccessor,
  dedupeObjectArray,
  joinObjectArrayByAccessor,
  reorderArrayObjects,
  cloneObjectArray,
  isEmptyObject,
  findObjectInArray,
};
