package thinhph.fptu.lab4.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import thinhph.fptu.lab4.entities.Employee;
import thinhph.fptu.lab4.repositories.IEmployeeRepository;

@Service
public class EmployeeService implements IEmployeeService {
    @Autowired
    private IEmployeeRepository employeeRepository;

    public Employee getEmployeeById(String empId) {
        return employeeRepository.getEmployeeById(empId);
    }

    public Employee delete(String empId) {
        return employeeRepository.delete(empId);
    }

    public Employee create(Employee emp) {
        return employeeRepository.create(emp);
    }

    public Page<Employee> getAllEmployees(int page, int size) {
        return employeeRepository.findAll(PageRequest.of(page, size));
    }
}
