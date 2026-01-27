package thinhph.fptu.lab4.repositories;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Repository;
import thinhph.fptu.lab4.entities.Employee;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Repository
public class EmployeeRepository implements IEmployeeRepository {
    private final List<Employee> employees = createList();

    private static List<Employee> createList() {
        List<Employee> tempEmployees = new ArrayList<>();
        Collections.addAll(tempEmployees,
                new Employee("EMP01", "Steven Paris", "Technical Manager", 3000),
                new Employee("EMP02", "John Lemon", "Developer", 1000),
                new Employee("EMP03", "Steven Paris", "Tester", 3000),
                new Employee("EMP04", "John Lemon", "Accountant", 1000),
                new Employee("EMP05", "Christopher Robert", "HR", 3000),
                new Employee("EMP06", "George Ronald", "Developer", 1000)
        );
        return tempEmployees;
    }

    public Employee getEmployeeById(String id) {
        return null;
    }

    public Employee delete(String id) {
        return null;
    }

    public Employee create(Employee employee) {
        employees.add(employee);
        System.out.println("Create employee: " + employee.getName());
        return employee;
    }

    public List<Employee> getAllEmployees() {
        return employees;
    }

    @Override
    public Iterable<Employee> findAll(Sort sort) {
        return employees;
    }

    @Override
    public Page<Employee> findAll(Pageable pageable) {
        List<Employee> allEmployees = createList();

        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), allEmployees.size());
        List<Employee> pageContent = allEmployees.subList(start, end);

        return new PageImpl<>(pageContent, pageable, allEmployees.size());
    }
}
