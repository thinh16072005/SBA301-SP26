package thinhph.fptu.lab4;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import thinhph.fptu.lab4.controllers.EmployeeController;
import thinhph.fptu.lab4.entities.Employee;
import thinhph.fptu.lab4.services.IEmployeeService;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(EmployeeController.class)
class EmployeeControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private IEmployeeService employeeService;

    @Test void shouldReturnEmployeeById() throws Exception {
        Employee employee = new Employee();
        employee.setEmpId("EMP02");
        Mockito.when(employeeService.getEmployeeById("e-2")).thenReturn(employee);

        mockMvc.perform(get("/employees/e-2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("e-2"));
    }

    @Test void shouldReturnPagedEmployees() throws Exception {
        Employee employee = new Employee();
        employee.setEmpId("e-1");
        Page<Employee> page = new PageImpl<>(List.of(employee));
        Mockito.when(employeeService.getAllEmployees(0,2)).thenReturn(page);

        mockMvc.perform(get("/employees").param("page", "0").param("size", "2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value("e-1"));
    }
}
