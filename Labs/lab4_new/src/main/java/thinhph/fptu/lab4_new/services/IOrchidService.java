package thinhph.fptu.lab4_new.services;

import thinhph.fptu.lab4_new.pojos.Orchid;

import java.util.List;
import java.util.Optional;

public interface IOrchidService {
    List<Orchid> getAllOrchids();
    Orchid insertOrchid(Orchid orchid);
    Optional<Orchid> getOrchidById(Long id);
    void deleteOrchidById(Long id);
    Orchid updateOrchid(Long OrchidId, Orchid orchid);
}
