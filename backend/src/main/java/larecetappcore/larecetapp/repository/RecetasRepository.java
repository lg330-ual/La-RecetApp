package larecetappcore.larecetapp.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import larecetappcore.larecetapp.entity.Receta;

@RepositoryRestResource
@CrossOrigin(originPatterns = "*", allowCredentials = "true", allowedHeaders = "*")
public interface RecetasRepository extends CrudRepository<Receta, Long> {
    
}
