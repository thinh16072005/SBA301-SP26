package thinhph.fptu.lab4.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import thinhph.fptu.lab4.entities.Employee;

import java.util.List;

public interface IEmployeeRepository extends PagingAndSortingRepository<Employee, String> {
    Employee getEmployeeById(String id);
    Employee delete(String id);
    Employee create(Employee employee);
    List<Employee> getAllEmployees();
}
