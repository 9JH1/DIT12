#include <stdio.h>
#include <termios.h> 
#include <sys/ioctl.h>
#include <unistd.h>
#include <string.h>

int main(){
	const char *input_file="index.js";
	struct winsize w;
	ioctl(STDOUT_FILENO,TIOCGWINSZ, &w);

	FILE *file;
	file = fopen(input_file,"r");
	char buff[256];
	const int width = w.ws_row;

	while(fgets(buff,256,file)){
		int diff = width-strlen(buff);
		if(diff == 0)
			continue;

		for(int i=0;i<diff;i++)
			printf(" ");
		buff[0] = '\0';
		buff[strlen(buff)] = ' ';

		printf("%s",buff);
		fflush(stdout);
	}
	fclose(file);
	return 0;
}
