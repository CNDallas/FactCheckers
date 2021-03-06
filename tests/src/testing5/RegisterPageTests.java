package testing5;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;

import org.junit.BeforeClass;
import org.junit.AfterClass;
import org.junit.Test;
import static org.junit.Assert.*;

public class RegisterPageTests {

	
 	private static WebDriver driver;
 	WebElement element;
	
	@BeforeClass
	public static void openBrowser() {
		System.setProperty("webdriver.chrome.driver", "C:/Program Files/apache-maven-3.6.0/chromedriver.exe");
        driver = new ChromeDriver();   
	}
	
	@AfterClass
	public static void closeBrowser() {
		driver.close();
	}
	

	
	@Test
	public void navigateToRegisterFromLogin() {
		driver.get("http://proj-319-048.misc.iastate.edu");
		driver.findElement(By.linkText("Login")).click();
        driver.findElement(By.partialLinkText("Register")).click();
        
        
        driver.getTitle();
        
		assertEquals("Can't get from login page to register", "Fact Checkers - Register", driver.getTitle());
	}
	
	@Test
	public void visitRegister() {
		driver.get("http://proj-319-048.misc.iastate.edu");
        driver.findElement(By.linkText("Create an Account")).click();
        driver.getTitle();
        
		assertEquals("Can't get from index.html to register", "Fact Checkers - Register", driver.getTitle());
	}
	
	@Test
	public void registerNewUser() {
		driver.navigate().to("http://proj-319-048.misc.iastate.edu");
        driver.findElement(By.linkText("Create an Account")).click();
		element = driver.findElement(By.name("username"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("password"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("password2"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("email"));
		element.sendKeys("selenium2@selenium2.com");
		element.submit();
		
		
		
		assertEquals("Not at user home page", "Home", driver.getTitle());
		assertTrue("Home doesn't contain username", driver.getPageSource().contains("selenium2"));
		
		driver.navigate().to("http://proj-319-048.misc.iastate.edu/login/deleteUser.php");
		driver.navigate().to("http://proj-319-048.misc.iastate.edu/dashboard/logout.php");
		
		
	}
	
	@Test
	public void validationUsername() {
		driver.navigate().to("http://proj-319-048.misc.iastate.edu");
        driver.findElement(By.linkText("Create an Account")).click();
		
		element = driver.findElement(By.name("username"));
		element.sendKeys("as");	//too short
		element = driver.findElement(By.name("password"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("password2"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("email"));
		element.sendKeys("selenium2@selenium2.com");
		element.submit();
        
		assertTrue("Username too short error did not appear", driver.getPageSource().contains(
				"Username needs to be at least 3 characters"));
		assertEquals("Not at registration page", "Fact Checkers - Register", driver.getTitle());
        
		
        
        element = driver.findElement(By.name("username"));
        element.clear();
		element.sendKeys("selenium");	//selenium already taken
		element = driver.findElement(By.name("password"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("password2"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("email"));
		element.sendKeys("selenium2@selenium2.com");
		element.submit();
		
		
		
		assertTrue("Username taken error did not appear", driver.getPageSource().contains(
				"Username taken already"));
		assertEquals("Not at registration page", "Fact Checkers - Register", driver.getTitle());
			
        element = driver.findElement(By.name("username"));
        element.clear();
		//Leave username blank
		element = driver.findElement(By.name("password"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("password2"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("email"));
		element.sendKeys("selenium2@selenium2.com");
		element.submit();
		
		assertTrue("Username required error did not appear", driver.getPageSource().contains(
				"Username is required"));
		assertEquals("Not at registration page", "Fact Checkers - Register", driver.getTitle());
	}
	
	@Test
	public void validationPassword() {
		driver.navigate().to("http://proj-319-048.misc.iastate.edu");
        driver.findElement(By.linkText("Create an Account")).click();
		
		element = driver.findElement(By.name("username"));
		element.sendKeys("selenium2");	
		element = driver.findElement(By.name("password")); //too short
		element.sendKeys("abcde");
		element = driver.findElement(By.name("password2"));
		element.sendKeys("abcde");
		element = driver.findElement(By.name("email"));
		element.sendKeys("selenium2@selenium2.com");
		element.submit();
        
		assertTrue("Password too short error did not appear", driver.getPageSource().contains(
				"Password needs to be at least 6 characters"));
		assertEquals("Not at registration page", "Fact Checkers - Register", driver.getTitle());
        
		
        
        element = driver.findElement(By.name("username"));
        element.clear();
		element.sendKeys("selenium2");	//Passwords don't match
		element = driver.findElement(By.name("password"));
		element.sendKeys("selenium");
		element = driver.findElement(By.name("password2"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("email"));
		element.sendKeys("selenium2@selenium2.com");
		element.submit();
		
		assertTrue("Password don't match error did not appear", driver.getPageSource().contains(
				"Passwords do not match"));
		assertEquals("Not at registration page", "Fact Checkers - Register", driver.getTitle());
			
        element = driver.findElement(By.name("username"));
        element.clear();
		//Leave password blank
		element = driver.findElement(By.name("password"));
		
		element = driver.findElement(By.name("password2"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("email"));
		element.sendKeys("selenium2@selenium2.com");
		element.submit();
		
		assertTrue("Password required error did not appear", driver.getPageSource().contains(
				"Password is required"));
		assertEquals("Not at registration page", "Fact Checkers - Register", driver.getTitle());
		
		element = driver.findElement(By.name("username"));
        element.clear();
		
		element = driver.findElement(By.name("password"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("password2"));
		//Leave password confirmation blank
		element = driver.findElement(By.name("email"));
		element.sendKeys("selenium2@selenium2.com");
		element.submit();
		
		assertTrue("Password confirmation required error did not appear", driver.getPageSource().contains(
				"Password confirmation is required"));
		assertEquals("Not at registration page", "Fact Checkers - Register", driver.getTitle());
	}
	
	@Test
	public void validationEmail() {
		driver.navigate().to("http://proj-319-048.misc.iastate.edu");
        driver.findElement(By.linkText("Create an Account")).click();
		
		element = driver.findElement(By.name("username"));
		element.sendKeys("selenium2");	
		element = driver.findElement(By.name("password")); //too short
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("password2"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("email"));
		element.sendKeys("m");
		element.submit();
		
		
		assertTrue("Non-valid email address error did not appear", driver.getPageSource().contains(
				"Not a valid email address"));
		assertEquals("Not at registration page", "Fact Checkers - Register", driver.getTitle());
		
		//Leave email blank
        element = driver.findElement(By.name("username"));
        element.clear();
		element = driver.findElement(By.name("password"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("password2"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("email"));
		
		element.submit();
		assertTrue("Email adddress required error did not appear", driver.getPageSource().contains(
				"Email is required"));
		assertEquals("Not at registration page", "Fact Checkers - Register", driver.getTitle());
		
		element = driver.findElement(By.name("username"));
        element.clear();
		element = driver.findElement(By.name("password"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("password2"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("email"));
		element.sendKeys("selenium@selenium.com");
		element.submit();
		
		assertTrue("Email adddress association error did not appear", driver.getPageSource().contains(
				"Email already associated with an account"));
		assertEquals("Not at registration page", "Fact Checkers - Register", driver.getTitle());
		
	}
	
	@Test
	public void redirectUserAlreadyRegistered() {
		driver.navigate().to("http://proj-319-048.misc.iastate.edu");
        driver.findElement(By.linkText("Create an Account")).click();
		element = driver.findElement(By.name("username"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("password"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("password2"));
		element.sendKeys("selenium2");
		element = driver.findElement(By.name("email"));
		element.sendKeys("selenium2@selenium2.com");
		element.submit();
		
		
		
		assertEquals("Not at user home page", "Home", driver.getTitle());
		assertTrue("Home doesn't contain username", driver.getPageSource().contains("selenium2"));
		
		
		driver.navigate().to("http://proj-319-048.misc.iastate.edu");
		driver.findElement(By.linkText("Create an Account")).click();
		
		assertEquals("Not at user homepage", "Home", driver.getTitle());
		
		driver.navigate().to("http://proj-319-048.misc.iastate.edu/login/deleteUser.php");
		driver.navigate().to("http://proj-319-048.misc.iastate.edu/dashboard/logout.php");
		
		assertEquals("Logout unsucessful", "Fact Checkers", driver.getTitle());
	}

}
