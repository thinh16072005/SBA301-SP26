package thinhph.fptu.lab4_new.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import thinhph.fptu.lab4_new.pojos.Orchid;
import thinhph.fptu.lab4_new.services.IOrchidService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/orchids")
public class OrchidController {
    @Autowired
    private IOrchidService iOrchidService;

    // HTTP Verb GET, POST, PUT, DELETE
    @GetMapping("/")
    public ResponseEntity<List<Orchid>> fetchAll() {
        List<Orchid> orchids = iOrchidService.getAllOrchids();
        if (orchids.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(orchids);
    }

    @PostMapping("/")
    @ResponseStatus(HttpStatus.CREATED)
    public Orchid saveOrchid(@RequestBody Orchid orchid) {
        return iOrchidService.insertOrchid(orchid); // 201 Created
    }

    @PutMapping("/{id}")
    public ResponseEntity<Orchid> updateOrchid ( @PathVariable Long id, @RequestBody Orchid o) {
        return ResponseEntity.ok(iOrchidService.updateOrchid(id, o));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrchid(@PathVariable Long id) {
        iOrchidService.deleteOrchidById(id);
        return ResponseEntity.ok("Orchid deleted.");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Orchid>> getOrchidById(@PathVariable Long id){
        Optional<Orchid> o = iOrchidService.getOrchidById(id);
        if (o.isPresent()) {
            return ResponseEntity.ok(o);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}