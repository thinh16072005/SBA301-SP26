package thinhph.fptu.lab4.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import thinhph.fptu.lab4.entities.Employee;
import thinhph.fptu.lab4.services.IEmployeeService;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
    @Autowired
    private IEmployeeService employeeService;

    @GetMapping
    public Page<Employee> firstPage(int page, int size) {
        return employeeService.getAllEmployees(page, size);
    }

    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable String id) {
        return employeeService.getEmployeeById(id);
    }

    @GetMapping("/delete/{id}")
    public Employee deleteEmployeeById(@PathVariable String id) {
        return employeeService.delete(id);
    }

    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeService.create(employee);
    }

}
