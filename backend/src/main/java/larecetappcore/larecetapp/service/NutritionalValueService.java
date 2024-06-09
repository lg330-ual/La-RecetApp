package larecetappcore.larecetapp.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import larecetappcore.larecetapp.dto.NutritionalValueDto;

@Component("nutritionalValueService")
@CrossOrigin(originPatterns = "*", allowCredentials = "true", allowedHeaders = "*")
public class NutritionalValueService {

    public NutritionalValueService() {
    }
    

    public List<NutritionalValueDto> retrieveNutritionalValues() {

        List<NutritionalValueDto> nutritionalValuesData = new ArrayList<>();

        try {
            Document webPage = Jsoup.connect("https://en.wikipedia.org/wiki/Table_of_food_nutrients").get();
            
            Element tbody = webPage.getElementById("mw-content-text").getElementsByTag("tbody").get(0);
            
            List<Element> rows = tbody.children().subList(2, tbody.children().size());

            for (int i = 0; i < rows.size(); i++) {
                Elements tds = rows.get(i).getElementsByTag("td");

                String foodName = tds.get(0).text();
                //Elements nextTds = null;
                if (tds.size() == 1 || tds.get(1).text() == "") {
                    tds = rows.get(++i).getElementsByTag("td");
                    foodName = foodName + " " + tds.get(0).text();
                }
                String measure = tds.get(1).text();
                Double grams = Double.parseDouble(tds.get(2).text().replace(',', '.'));
                Double calories = Double.parseDouble(tds.get(3).text().replace(',', '.'));
                Double protein = Double.parseDouble(tds.get(4).text().replace(',', '.'));
                String carb = tds.get(5).text();
                Double fiber = Double.parseDouble(tds.get(6).text().replace(',', '.'));
                String fat = tds.get(7).text();
                String satFat = tds.get(8).text();

                NutritionalValueDto nutritionalValue = new NutritionalValueDto(foodName, measure, grams, calories, protein, carb, fiber, fat, satFat);
                nutritionalValuesData.add(nutritionalValue);
            }

            return nutritionalValuesData;
        
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;

    }

}
