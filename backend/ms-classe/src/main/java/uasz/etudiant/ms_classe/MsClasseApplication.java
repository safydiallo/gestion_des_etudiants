package uasz.etudiant.ms_classe;  // Même package que le contrôleur ou parent

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;


@SpringBootApplication(scanBasePackages = "uasz.etudiant.ms_classe")
@EnableDiscoveryClient
@EnableFeignClients
public class MsClasseApplication {
    public static void main(String[] args) {
        SpringApplication.run(MsClasseApplication.class, args);
    }
}