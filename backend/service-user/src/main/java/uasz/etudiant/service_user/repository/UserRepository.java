package uasz.etudiant.service_user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import uasz.etudiant.service_user.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
}

