package larecetappcore.larecetapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import larecetappcore.larecetapp.dto.NutritionalValueDto;
import larecetappcore.larecetapp.service.NutritionalValueService;

@RestController
@RequestMapping("/nutritional-values")
@CrossOrigin(originPatterns = "*", allowCredentials = "true", allowedHeaders = "*")
public class ScrappingController {
    
    @Autowired
    private NutritionalValueService nutritionalValueService;

    @GetMapping("data")
    public ResponseEntity<List<NutritionalValueDto>> getNutritionalValues() {
        List<NutritionalValueDto> nutritionalValues = nutritionalValueService.retrieveNutritionalValues();
        return new ResponseEntity<>(nutritionalValues, HttpStatus.OK);
    }
}
