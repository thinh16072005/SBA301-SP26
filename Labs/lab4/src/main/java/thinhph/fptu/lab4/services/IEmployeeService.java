package thinhph.fptu.lab4.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import thinhph.fptu.lab4.entities.Employee;


public interface IEmployeeService {
    Employee getEmployeeById(String empId);
    Employee delete(String empId);
    Employee create(Employee user);
    Page<Employee> getAllEmployees(int page, int size);
}
