package thinhph.fptu.lab5.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import thinhph.fptu.lab5.dto.OrchidCreateDto;
import thinhph.fptu.lab5.dto.OrchidUpdateDto;
import thinhph.fptu.lab5.exceptions.NotFoundException;
import thinhph.fptu.lab5.pojos.Category;
import thinhph.fptu.lab5.pojos.Orchid;
import thinhph.fptu.lab5.repositories.ICategoryRepository;
import thinhph.fptu.lab5.repositories.IOrchidRepository;

import java.util.List;
import java.util.Optional;

@Service
public class OrchidService implements IOrchidService {
    private final IOrchidRepository orchidRepository;
    private final ICategoryRepository categoryRepository;

    @Autowired
    public OrchidService(IOrchidRepository orchidRepository, ICategoryRepository categoryRepository) {
        this.orchidRepository = orchidRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Orchid> getAllOrchids() {
        return orchidRepository.findAll();
    }

    @Override
    public Orchid insertOrchid(OrchidCreateDto orchid) {
        Orchid o = new Orchid();
        o.setOrchidName(orchid.getOrchidName());
        o.setOrchidDescription(orchid.getOrchidDescription());
        o.setOrchidUrl(orchid.getOrchidUrl());
        o.setIsNatural(Boolean.TRUE.equals(orchid.getIsNatural()));
        o.setIsAttractive(Boolean.TRUE.equals(orchid.getIsAttractive()));

        if (orchid.getCategoryId() != null) {
            Category c = categoryRepository.findById(orchid.getCategoryId())
                    .orElseThrow(() -> new NotFoundException("Category not found with id: " + orchid.getCategoryId()));
            o.setCategory(c);
        }

        return orchidRepository.save(o);
    }

    @Override
    public Optional<Orchid> getOrchidById(Long id) {
        return orchidRepository.findById(id);
    }

    @Override
    public void deleteOrchidById(Long id) {
        orchidRepository.deleteById(id);
    }

    @Override
    public Orchid updateOrchid(Long orchidId, OrchidUpdateDto orchid) {
        return orchidRepository.findById(orchidId)
                .map(existing -> {
                    existing.setOrchidName(orchid.getOrchidName());
                    existing.setOrchidDescription(orchid.getOrchidDescription());
                    existing.setOrchidUrl(orchid.getOrchidUrl());
                    existing.setIsAttractive(orchid.getIsAttractive());
                    existing.setIsNatural(orchid.getIsNatural());
                    
                    if (orchid.getCategoryId() != null) {
                        Category category = categoryRepository
                                .findById(orchid.getCategoryId())
                                .orElseThrow(() -> new NotFoundException("Category not found with id: " + orchid.getCategoryId()));
                        existing.setCategory(category);
                    }
                    
                    return orchidRepository.save(existing);
                })
                .orElse(null);
    }
}
