package thinhph.fptu.lab4_new.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import thinhph.fptu.lab4_new.pojos.Orchid;
import thinhph.fptu.lab4_new.repositories.IOrchidRepository;

import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService {
    private final IOrchidRepository repository;

    @Autowired
    public OrchidService(IOrchidRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Orchid> getAllOrchids() {
        return repository.findAll();
    }

    @Override
    public Orchid insertOrchid(Orchid orchid) {
        return repository.save(orchid);
    }

    @Override
    public Optional<Orchid> getOrchidById(Long id) {
        return repository.findById(id);
    }

    @Override
    public void deleteOrchidById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Orchid updateOrchid(Long orchidId, Orchid orchid) {
        Orchid o = repository.getById(orchidId);
        if (o != null) {
            o.setOrchidName(orchid.getOrchidName());
            o.setOrchidDescription(orchid.getOrchidDescription());
        }
        return null;
    }
}
