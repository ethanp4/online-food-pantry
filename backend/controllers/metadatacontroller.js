import { getAllFoodTypes, getAllDietaryPreferences, getAllCulturalPreferences } from "../model/metadatamodel.js";

export const getAllMetadata = async (req, res) => {
    try {
        const foodTypes = await getAllFoodTypes();
        const dietaryPreferences = await getAllDietaryPreferences();
        const culturalPreferences = await getAllCulturalPreferences();
        res.status(200).json({ foodTypes, dietaryPreferences, culturalPreferences });
    } catch (error) {
        res.status(500).json({ message: "Failed to get metadata" });
    }
}