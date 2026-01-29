package thinhph.fptu.lab5.services;

import thinhph.fptu.lab5.dto.OrchidCreateDto;
import thinhph.fptu.lab5.dto.OrchidUpdateDto;
import thinhph.fptu.lab5.pojos.Orchid;

import java.util.List;
import java.util.Optional;

public interface IOrchidService {
    List<Orchid> getAllOrchids();
    Orchid insertOrchid(OrchidCreateDto orchid);
    Optional<Orchid> getOrchidById(Long id);
    void deleteOrchidById(Long id);
    Orchid updateOrchid(Long OrchidId, OrchidUpdateDto orchid);
}
