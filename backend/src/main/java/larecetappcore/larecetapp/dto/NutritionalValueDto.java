package larecetappcore.larecetapp.dto;

public class NutritionalValueDto {
    
    public String foodName;
    public String measure;
    public Double grams;
    public Double calories;
    public Double protein;
    public String carb;
    public Double fiber;
    public String fat;
    public String satFat;

    public NutritionalValueDto() {
    }

    public NutritionalValueDto(String foodName, String measure, Double grams, Double calories, Double protein, String carb, Double fiber, String fat, String satFat) {
        this.foodName = foodName;
        this.measure = measure;
        this.grams = grams;
        this.calories = calories;
        this.protein = protein;
        this.carb = carb;
        this.fiber = fiber;
        this.fat = fat;
        this.satFat = satFat;
    }


}
