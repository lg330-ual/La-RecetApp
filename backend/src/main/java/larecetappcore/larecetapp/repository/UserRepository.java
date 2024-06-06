package larecetappcore.larecetapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import larecetappcore.larecetapp.entity.User;

@RepositoryRestResource
@CrossOrigin(originPatterns = "*", allowCredentials = "true", allowedHeaders = "*")
public interface UserRepository extends CrudRepository<User, Long> {

    List<User> findAll();
    Optional<User> findById(@Param("id") Long id);
}
