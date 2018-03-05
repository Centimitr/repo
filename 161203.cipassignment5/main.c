#include <stdio.h>

unsigned int hz2add(unsigned char hz[3])
{
	return ((hz[1]-0xA0-1) + 94*(hz[0]-0xB0+15))*32;
}

void hz2buf(unsigned char hz[3], FILE* fp, unsigned char buf[32])
{
    int offset;
	offset = hz2add(hz);
    fseek(fp, offset, SEEK_SET);
    fread(buf, 1, 32, fp);
}

void print(unsigned char buf[32], char* dark_str, char* lite_str)
{
	int i, j, k;
	unsigned char dot[8] = {0x80,0x40,0x20,0x10,0x08,0x04,0x02,0x01};
	for(i=0; i<16; i++){
		for(j=0; j<2; j++){
			for(k=0; k<8; k++){
				printf("%s", buf[i*2+j]&dot[k]? dark_str:lite_str);
            }
        }
        printf("\n\r");
    }
}


int main(void)
{
    FILE* fp = NULL;
    FILE* fp2 = NULL;
	unsigned char buf[32];

	fp = fopen("hzk16", "rb");
    if(fp == NULL){
        return 1;
    }
	fp2 = fopen("name", "wb");
    if(fp2 == NULL){
        return 1;
    }

	// 1,2
	unsigned char hz[3] = "ºº";
	hz2buf(hz,fp,buf);
	print(buf,"*"," ");
	print(buf," ","*");
	print(buf,"**","  ");

	// 3
	unsigned char name[6] = "Ê·Ïþ";
	hz2buf(name,fp,buf);
	print(buf,"**","  ");
	fwrite(buf,1,32,fp2);

	hz2buf(name+2,fp,buf);
	print(buf,"**","  ");
	fwrite(buf,1,32,fp2);

    fclose(fp);
    fclose(fp2);
    fp = fp2 = NULL;
    return 0;
}
