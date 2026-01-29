package thinhph.fptu.lab5.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thinhph.fptu.lab5.dto.OrchidCreateDto;
import thinhph.fptu.lab5.dto.OrchidUpdateDto;
import thinhph.fptu.lab5.exceptions.NotFoundException;
import thinhph.fptu.lab5.pojos.Orchid;
import thinhph.fptu.lab5.services.IOrchidService;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/orchids")
public class OrchidController {
    @Autowired
    private IOrchidService iOrchidService;

    // HTTP Verb GET, POST, PUT, DELETE
    @GetMapping
    public ResponseEntity<List<Orchid>> fetchAll() {
        List<Orchid> orchids = iOrchidService.getAllOrchids();
        if (orchids.isEmpty()) {
            throw new NotFoundException("Orchids not found.");
        }
        return ResponseEntity.ok(orchids);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Orchid saveOrchid(@RequestBody OrchidCreateDto orchid) {
        return iOrchidService.insertOrchid(orchid); // 201 Created
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orchid> updateOrchid ( @PathVariable Long id, @RequestBody OrchidUpdateDto o) {
        Orchid updated = iOrchidService.updateOrchid(id, o);
        if (updated == null) {
            throw new NotFoundException("Orchid not found with id: " + id);
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrchid(@PathVariable Long id) {
        iOrchidService.deleteOrchidById(id);
        return ResponseEntity.ok("Orchid deleted.");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Orchid> getOrchidById(@PathVariable Long id) {
        return iOrchidService.getOrchidById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new NotFoundException("Orchid not found with id: " + id));
    }
}