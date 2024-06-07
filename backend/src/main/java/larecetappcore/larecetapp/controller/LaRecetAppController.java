package larecetappcore.larecetapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import larecetappcore.larecetapp.repository.RecetasRepository;
import larecetappcore.larecetapp.repository.UserRepository;
import larecetappcore.larecetapp.entity.Receta;
import larecetappcore.larecetapp.entity.User;

@RestController
@CrossOrigin(originPatterns = "*", allowCredentials = "true", allowedHeaders = "*")
public class LaRecetAppController {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecetasRepository recetasRepository;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok((List<User>) userRepository.findAll());
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return ResponseEntity.ok(userRepository.save(user));
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userRepository.findById(id).get());
    }
    
    @PostMapping("/users/{id}")
    public ResponseEntity<?> saveRecipeForUser(@PathVariable Long id, @RequestBody Receta receta) {
        User usuario = userRepository.findById(id).get();
        receta.getUsers().add(usuario);
        usuario.getRecetasGuardadas().add(receta);
        userRepository.save(usuario);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/users/{id}/recetas-guardadas")
    public ResponseEntity<?> quitarRecetaGuardada(@PathVariable Long id, @RequestBody Receta receta) {
        User usuario = userRepository.findById(id).get();

        List<Receta> recetasGuardadas = usuario.getRecetasGuardadas();
        Receta recetaAEliminar = recetasRepository.findById(receta.getId()).get();
        int indice = recetasGuardadas.indexOf(recetaAEliminar);

        usuario.getRecetasGuardadas().remove(indice);
        userRepository.save(usuario);
        recetasRepository.delete(recetaAEliminar);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users/{id}/recetas-creadas")
    public ResponseEntity<Receta> crearReceta(@PathVariable Long id, @RequestBody Receta receta) {
        User usuario = userRepository.findById(id).get();
        receta.setUser(usuario);
        recetasRepository.save(receta);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/recetas/all")
    public ResponseEntity<?> deleteAllRecipes() {
        userRepository.deleteAllReferencesToReceta();
        recetasRepository.deleteAll();
        return ResponseEntity.ok().build();
    }
}
