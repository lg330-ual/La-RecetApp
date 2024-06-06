package larecetappcore.larecetapp.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Receta> recetasGuardadas = new ArrayList<Receta>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_recetas", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "receta_id"))
    private List<Receta> recetasCreadas = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Receta> getRecetasGuardadas() {
        return this.recetasGuardadas;
    }

    public void setRecetasGuardadas(List<Receta> recetasGuardadas) {
        this.recetasGuardadas = recetasGuardadas;
    }

    public List<Receta> getRecetasCreadas() {
        return this.recetasCreadas;
    }

    public void setRecetasCreadas(List<Receta> recetasCreadas) {
        this.recetasCreadas = recetasCreadas;
    }
}
